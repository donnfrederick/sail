module Analytics
  class ConversationSchedules < Conversations
    def each_data_at(_type, start_at, end_at)
      conversation_ids = student_conversation_ids(start_at, end_at) + teacher_conversation_ids(start_at, end_at)
      conversation_ids.uniq.count
    end

    def student_conversation_ids(start_at, end_at)
      Conversation.
        by_student_id(statistics_student_ids).
        start_at_by(start_at).
        end_at_by(end_at).
        pluck(:id)
    end

    def teacher_conversation_ids(start_at, end_at)
      Conversation.
        by_teacher_id(statistics_teacher_ids).
        start_at_by(start_at).
        end_at_by(end_at).
        pluck(:id)
    end

    # 時間帯の分布
    def self.hourly_distribution(since: nil, by: nil, timezone: "Asia/Tokyo")
      since = Conversation.first.created_at if since.nil?
      by = Time.now if by.nil?

      Array.new(24, 0).tap do |distribution|
        Conversation.finished.start_at_by(since).end_at_by(by).find_each do |c|
          hour = c.start_at.in_time_zone(timezone).strftime("%H").to_i
          distribution[hour] = 0 if distribution[hour].nil?
          distribution[hour] += 1
        end
      end
    end

    # 時間帯の分布
    def self.open_hourly_distribution(since: nil, by: nil, timezone: "Asia/Tokyo")
      since = Conversation.first.created_at if since.nil?
      by = Time.now if by.nil?

      Array.new(24, 0).tap do |distribution|
        Conversation.where.not(status: Conversation::STATUS_CANCELED).start_at_by(since).end_at_by(by).find_each do |c|
          hour = c.start_at.in_time_zone(timezone).strftime("%H").to_i
          distribution[hour] = 0 if distribution[hour].nil?
          distribution[hour] += 1
        end
      end
    end

    # 曜日の分布
    def self.weekly_distribution(since: nil, by: nil, timezone: "Asia/Tokyo")
      since = Conversation.first.created_at if since.nil?
      by = Time.now if by.nil?

      Array.new(7, 0).tap do |distribution|
        Conversation.finished.start_at_by(since).end_at_by(by).find_each do |c|
          week = c.start_at.in_time_zone(timezone).strftime("%w").to_i
          distribution[week] = 0 if distribution[week].nil?
          distribution[week] += 1
        end
      end
    end

    # 曜日の分布
    def self.open_weekly_distribution(since: nil, by: nil, timezone: "Asia/Tokyo")
      since = Conversation.first.created_at if since.nil?
      by = Time.now if by.nil?

      Array.new(7, 0).tap do |distribution|
        Conversation.where.not(status: Conversation::STATUS_CANCELED).start_at_by(since).end_at_by(by).find_each do |c|
          week = c.start_at.in_time_zone(timezone).strftime("%w").to_i
          distribution[week] = 0 if distribution[week].nil?
          distribution[week] += 1
        end
      end
    end

    private

      def statistics_student_ids
        @statistics_student_ids ||= Student.statistics.pluck(:id)
      end

      def statistics_teacher_ids
        @statistics_teacher_ids ||= Teacher.statistics.pluck(:id)
      end
  end
end

