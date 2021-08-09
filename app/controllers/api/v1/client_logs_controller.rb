module Api
  module V1
    class ClientLogsController < ApiController

      skip_before_action :auth_with_token!

      validates :create do
        string :slug, description: "種類"
        string :data, description: "json文字列"
      end

      def create
        ClientLog.create!(
          user: current_user,
          slug: params[:slug],
          data: params[:data]
        )
        render json: {
          error: 0,
          message: "ok",
        }, status: :created
      end
    end
  end
end
