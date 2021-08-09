module Api
  module V1
    class ChatsController < ApiController
      before_action :auth_with_token!

      validates :create do
        integer :id, required: true, description: "参加している会話のID"
        string :content, description: "Chatの中身"
      end

      def index
        @conversation = Conversation.find(params[:id])
        render json: @conversation.chats
      end

      def create
        @conversation = Conversation.includes(:chats).find(params[:id])
        @conversation.chats.create(user: current_user, content: params[:chat][:content])

        partner = current_user.teacher? ? @conversation.student : @conversation.teacher
        body = {
          channel: "ConversationsChannel",
          action:  :update_chats,
          chats: @conversation.chats.includes(:user)
        }
        ConversationsChannel.broadcast_to partner, body
        render json: @conversation.chats.includes(:user)
      end
    end
  end
end
