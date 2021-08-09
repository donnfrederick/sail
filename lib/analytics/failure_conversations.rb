module Analytics
  class FailureConversations < Conversations
    def each_data_at(_type, start_at, end_at)
      conversation_ids = student_conversation_ids(start_at, end_at) + teacher_conversation_ids(start_at, end_at)
      conversation_ids.uniq.count
    end

    def student_conversation_ids(start_at, end_at)
      Conversation.
        by_student_id(statistics_student_ids).
        start_at_by(start_at).
        end_at_by(end_at).
        failed.
        pluck(:id)
    end

    def teacher_conversation_ids(start_at, end_at)
      Conversation.
        by_teacher_id(statistics_teacher_ids).
        start_at_by(start_at).
        end_at_by(end_at).
        failed.
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
