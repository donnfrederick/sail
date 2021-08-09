module Api
  module V1
    class EnvironmentsController < ApiController
      skip_before_action :auth_with_token!

      def index
        content = {
          sora_signaling_url: ENV["SORA_SIGNALING_URL"],
          sora_api_url:       ENV["SORA_API_URL"],
          app_socket_url:     ENV["APP_SOCKET_URL"],
        }

        render json: content

      end
    end
  end
end
