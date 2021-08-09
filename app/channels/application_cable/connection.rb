module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user

      logger.add_tags "ActionCable", current_user.id
    end

    protected

      def find_verified_user
        ws_token = request.params[:ws_token]
        current_user = ws_token.blank? ? nil : User.find_by(web_socket_token: request.params[:ws_token])

        unless current_user
          reject_unauthorized_connection
        end

        current_user
      end
  end
end
