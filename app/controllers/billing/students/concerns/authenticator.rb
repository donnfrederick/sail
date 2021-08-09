module Billing
  module Students
    module Concerns
      module Authenticator
        extend ActiveSupport::Concern

        included do
          before_action :auth_with_token!
          before_action :user_time_zone
          before_action :user_notification
          before_action :save_access_log
        end

        def student
          return nil if params[:auth_token].nil?

          @student ||= Student.includes([
                                            :blocks_from_user, :blocks_to_user, :favorites_from_user, :favorites_to_user,
                                            :hobbies, :purposes
                                          ]).find_by(auth_token: params[:auth_token])

          Context.instance.current_user = @student

          @student
        end

        def user_signed_in?
          student.present?
        end

        def auth_with_token!
          unless user_signed_in?
            redirect_to "/students/signin?billing=true&reset-token=true"
          end
        end

        def user_time_zone
          student.try(:set_timezone)
        end

        def user_notification
          student.try(:notify)
        end

        def save_access_log
          student.access_log_append!(request) if user_signed_in?
        end
      end
    end
  end
end
