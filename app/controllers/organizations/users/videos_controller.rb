module Organizations
  module Users
    class VideosController < BaseController
      before_action :the_conversation

      def play
      end

      protected

      def the_conversation
        @conversation = if params[:conversation_id].present?
                          Conversation.find_by(id: params[:conversation_id])
                        else
                          nil
                        end
      end
    end
  end
end
