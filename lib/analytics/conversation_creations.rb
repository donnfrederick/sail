module Analytics
  class ConversationCreations < Conversations
    def each_data_at(_type, start_at, end_at)
      conversation_ids = student_conversation_ids(start_at, end_at) + teacher_conversation_ids(start_at, end_at)
      conversation_ids.uniq.count
    end

    def student_conversation_ids(start_at, end_at)
      Conversation.
        by_student_id(statistics_student_ids).
        where("created_at >= ?", start_at).
        where("created_at <= ?", end_at).
        pluck(:id)
    end

    def teacher_conversation_ids(start_at, end_at)
      Conversation.
        by_teacher_id(statistics_teacher_ids).
        where("created_at >= ?", start_at).
        where("created_at <= ?", end_at).
        pluck(:id)
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
