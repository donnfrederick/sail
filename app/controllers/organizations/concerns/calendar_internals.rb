module Organizations
  module Concerns
    # カレンダーに使う処理を提供
    module CalendarInternals
      extend ActiveSupport::Concern

      protected

      def page_of_month(page = 1)
        Time.zone.now + (page - 1).months
      end

      def start_date(offset = 0)
        start_date_of(Time.zone.now, offset)
      end

      def start_date_next(offset = 0)
        start_date_next_of(Time.zone.now, offset)
      end

      # 特定の月のカレンダー上の初日を取得 (前月の先頭曜日)
      def start_date_of(month, offset = 0)

        first = month.beginning_of_month
        wrday = (first.wday + offset) % 7
        first - wrday.days
      end

      # 特定の次月のカレンダー上の初日を取得 (前月の先頭曜日)
      def start_date_next_of(month, offset = 0)
        if month.blank?
          month = Time.zone.now
        end

        first = month.next_month.beginning_of_month
        first + (6 - first.wday).days
      end

      # 何週間あるか
      def weeks(start_date, start_date_next)
        ((start_date_next - start_date) / 86400 / 7) + 2
      end

      # section_scheduleを構築する
      def section_schedule_between(start_at, end_at)
        object = ::Structs::SectionSchedule.new
        conversations = section_conversations_at(start_at, end_at)
        conversations.each do |c|
          user = if current_staff.nursing_house?
                   c.teacher
                 else
                   c.student
                 end

          object.schedule_of(user).add(c)
        end

        if current_staff.university?
          user_ids = participants.pluck(:id)
          ambush_conversations = AmbushConversation.start_on_by(start_at).end_on_by(end_at).where(user_id: user_ids)
          ambush_conversations.each do |ambush|
            object.schedule_of(ambush.user).add(ambush)
          end
        end

        object
      end

      # section_schedule_betweenのScheduleで囲ってない版
      def section_conversations_at(start_at, end_at)
        participant_ids = participants.pluck(:id)
        if current_staff.nursing_house?
          Conversation.start_on_by(start_at).end_on_by(end_at).by_teacher_id(participant_ids).all
        else
          Conversation.start_on_by(start_at).end_on_by(end_at).by_student_id(participant_ids).all
        end
      end
    end
  end
end
