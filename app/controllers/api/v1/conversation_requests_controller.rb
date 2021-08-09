module Api
  module V1
    class ConversationRequestsController < ApiController
      before_action :set_conversation_request, only: [:update]
      before_action :set_conversation, only: [:destroy]

      validates :create do
        integer :reservable_conversation_id,
                description: "リクエストを行う対象の会話のReservableConversation.idを指定します。"
      end

      def index
        requests = ConversationRequest.by_user_id(current_user.id).available.order_by_start_at

        render json: requests,
               include: [:from_users, :conversations],
               root: :data,
               adapter: :json,
               status: :ok
      end

      def create
        service = ConversationRequestCreateService.new current_user
        if service.create_by_id(params[:reservable_conversation_id])
          render json: service.conversation_request,
                 status: :created
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def update
        service = ConversationRequestApproveService.new(@conversation_request)
        if service.approve_by(current_user)
          render json: service.conversation_request,
                 status: :ok,
                 include: [:from_users, :conversations],
                 serializer: ConversationRequestSerializer
        elsif !service.authorized?
          head :unauthorized
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        @conversation.requests.by_user_id(current_user.id).destroy_all
        head :no_content
      end

      private

        def set_conversation
          @conversation ||= Conversation.find(params[:id])
        end

        def set_conversation_request
          @conversation_request ||= ConversationRequest.find(params[:id])
        end
    end
  end
end
