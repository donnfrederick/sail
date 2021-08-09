module Organizations
  module Concerns
    module CalendarValidators
      extend ActiveSupport::Concern

      included do
        validates :create do
          integer :user_id, required: true,
                            description: "時間を開けるユーザー"
          time :start_at,   required: true,
                            strong:   true,
                            format:   ["%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%dT%H:%M:%S%:z"],
                            description: "Default: null\n予約の希望開始日時"
          time :end_at,     strong: true,
                            format: ["%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%dT%H:%M:%S%:z"],
                            description: "Default: null\n予約の希望終了日時"
        end
      end

      def create
        data = params.permit(:user_id, :start_at, :end_at)
        user = User.find_by(id: data[:user_id])
        skip_save = false

        if current_staff.university?
          rcs = Conversation.reservable_conversations_at(
            user, Time.parse(data[:start_at]), Time.parse(data[:end_at])
          )
          best_rc = rcs.max {|a, b| user.score(a.user) <=> user.score(b.user) }
          if best_rc.present?
            service = ConversationReserveService.new
            ok = service.reserve_by_reservable_conversation(user, best_rc)

            raise ActiveRecord::RecordNotSaved unless ok

            conversation = service.conversation
            skip_save = true
          else
            conversation = AmbushConversation.new(data)
          end
        else
          data.delete(:user_id)
          conversation = Conversation.new(data)
          conversation.users << user
        end

        if skip_save || conversation.save
          if !skip_save && conversation.is_a?(Conversation)
            conversation.ambush_conversation(user)
          end

          redirect_to "/organizations/#{current_staff.nursing_house? ? "nhs" : "univs"}/conversations/calendar/#{params[:dimension_id]}"
        else
          redirect_to "/organizations/#{current_staff.nursing_house? ? "nhs" : "univs"}/conversations/"
        end
      end

      def destroy
        data = params.permit(:conversation_id, :user_id)
        success = if params[:ambush] == "1"
                    data[:id] = data.delete(:conversation_id) # キー置き換え
                    ambush_conversation = AmbushConversation.find_by(data)
                    destroy_ambush_conversation(ambush_conversation) if ambush_conversation.present?
                  else
                    users_conversation = UsersConversation.find_by(data)
                    destroy_users_conversation(users_conversation) if users_conversation.present?
                  end

        if success && params[:dimension_id].present?
          redirect_to "/organizations/#{current_staff.nursing_house? ? "nhs" : "univs"}/conversations/calendar/#{params[:dimension_id]}"
        else
          redirect_to "/organizations/#{current_staff.nursing_house? ? "nhs" : "univs"}/conversations/"
        end
      end

      def destroy_users_conversation(users_conversation)
        return unless users_conversation.present?

        user = users_conversation.user
        conversation = users_conversation.conversation

        if user.teacher?
          # Teacher: 会話の時間枠もろとも削除
          conversation.cancel_by(:teacher)
          Notification.notify_conversation_cancelled(conversation, user)
          conversation.destroy
        elsif users_conversation.destroy
          # Student: シニアの空き時間は再度空けた状態にする
          conversation.status = Conversation::STATUS_WAITING
          conversation.save
        end
      end

      def destroy_ambush_conversation(ambush_conversation)
        ambush_conversation.present? && ambush_conversation.destroy
      end
    end
  end
end
