module Organizations
  module Ajax
    class CalendarController < AjaxController
      include Concerns::CalendarInternals

      # 現在相手のロールが空けている日時をmonth月に対して取得する
      validates :waiting_teacher_conversations do
        integer :page, required: false,
                       description: "取得月のオフセット"
      end
      validates :waiting_student_conversations do
        integer :page, required: false,
                       description: "取得月のオフセット"
      end

      def waiting_teacher_conversations
        page = params[:page].present? ? params[:page] : 1
        offset = 6
        target_datetime = Time.zone.now + (page.to_i - 1).months
        start_at = start_date_of(target_datetime.beginning_of_month, offset)
        weeks_ = weeks(target_datetime.beginning_of_month, (target_datetime + 1.months).beginning_of_month)
        end_at = start_at + (weeks_ * 7).days

        scope = Conversation.start_at_by(start_at).end_at_by(end_at).waiting
        conversations = waiting_conversations(scope)
        render json: conversations
      end

      def waiting_student_conversations
        page = params[:page].present? ? params[:page] : 1
        scope = AmbushConversation.monthly_by(page).visible
        conversations = waiting_conversations(scope)
        render json: conversations
      end

      protected

      def waiting_conversations(conversations)
        result = {}
        conversations.each do |conversation|
          interval = (conversation.end_at - conversation.start_at).to_i / 1800
          (0..interval).each do |diff|
            start_at = conversation.start_at + (diff * 30).minutes
            format = if start_at.strftime("%M").to_i < 30
                      "%Y-%m-%dT%H:00:00Z"
                    else
                      "%Y-%m-%dT%H:30:00Z"
                     end
            key = start_at.strftime(format)
            result[key] = [] if result[key].blank?
            result[key] << conversation
          end
        end
        result
      end
    end
  end
end
