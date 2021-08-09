class Conversation
  # 利用目的のスコア配分
  PURPOSE_SCORES = {
    "5" => {
      "1" => 1,
      "2" => 2,
      "3" => 0,
      "4" => 10,
    },
    "6" => {
      "1" => 1,
      "2" => 2,
      "3" => 7,
      "4" => 2,
    },
    "7" => {
      "1" => 1,
      "2" => 2,
      "3" => 7,
      "4" => 0,
    },
    "8" => {
      "1" => 1,
      "2" => 2,
      "3" => 4,
      "4" => 0,
    },
  }.freeze

  # その日、そのユーザーが予約可能なシニアのReservableConversationを取得する
  def self.reservable_conversations_for(user, date)
    return [] unless user.student?

    start_at, end_at = if date.in_time_zone.to_date == Time.zone.now.to_date
                         [
                           Time.zone.now,
                           date.in_time_zone.end_of_day,
                         ]
                       else
                         [
                           date.in_time_zone.beginning_of_day,
                           date.in_time_zone.end_of_day,
                         ]
                       end

    # start_at, end_at = [date.in_time_zone,date.in_time_zone.since(2.hours)]

    reservable_conversations_at(user, start_at, end_at)
  end

  def self.reservable_conversations_at(user, start_at, end_at)
    rcs = ReservableConversation.visible.start_at_by(start_at).end_at_by(end_at)

    exclusions = ConversationRequest.pending_for(user).pluck(:conversation_id)

    rcs.
      reject {|x| x.user.blocks?(user) || user.blocks?(x.user) }.
      reject {|x| x.user.blocks_implicitly?(user) || user.blocks_implicitly?(x.user) }.
      select {|x| user.enough_skillful_for?(x.user) }.
      reject {|x| exclusions.include?(x.conversation_id) }
  end

  # 開始時間のパターン
  #   ["2018-06-27T02:30:00Z", "2018-06-27T03:00:00Z", ...]
  def self.starting_times(start_at, end_at)
    results = []
    hours   = (end_at - start_at) / 60 / 60

    0.step(hours, 0.5) do |n|
      prepared_start_at = (start_at + n.hours)
      results << prepared_start_at.utc.iso8601 if prepared_start_at < end_at
    end

    results
  end
end
