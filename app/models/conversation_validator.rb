class ConversationValidator
  attr_reader :conversation, :target_user

  def initialize(conversation, target_user)
    @conversation = conversation
    @target_user = target_user
  end

  def duplicates
    # 予約時間を取得
    return [] if @target_user.nil?

    conversations = @target_user.conversations.opened

    reserved_times = []
    conversations.each do |conversation|
      next if conversation.id == @conversation.id
      reserved_times |= Conversation.starting_times(conversation.start_at, conversation.end_at)
    end
    # これから予約しようとしている時間帯
    new_times = Conversation.starting_times(@conversation.start_at, @conversation.end_at)

    new_times & reserved_times
  end

  private

    def duplicated?
      duplicates.present?
    end
end
