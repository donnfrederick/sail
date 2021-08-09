module Api
  module V1
    module Concerns
      module Authenticator
        extend ActiveSupport::Concern

        included do
          before_action :auth_with_token!
          before_action :user_time_zone
          before_action :user_notification
          before_action :save_access_log
        end

        def current_user
          return nil if auth_token.nil?

          @current_user ||= User.includes([
                                            :blocks_from_user, :blocks_to_user, :favorites_from_user, :favorites_to_user,
                                            :hobbies, :purposes
                                          ]).find_by(auth_token: auth_token)

          Context.instance.current_user = @current_user

          @current_user
        end

        def user_signed_in?
          current_user.present?
        end

        def auth_with_token!
          head :unauthorized unless user_signed_in?
        end

        def auth_scheme
          request.headers["Authorization"].to_s.split(" ").first
        end

        def auth_token
          return nil unless auth_scheme.to_s.match?(/^Bearer/)

          request.headers["Authorization"].to_s.split(" ").last
        end

        def user_time_zone
          current_user.try(:set_timezone)
        end

        def user_notification
          current_user.try(:notify)
        end

        def save_access_log
          current_user.access_log_append!(request) if user_signed_in?
        end
      end
    end
  end
end
