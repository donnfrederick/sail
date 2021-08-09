module Api
  module V1
    module Organizations
      class SessionsController < ApiController
        skip_before_action :auth_with_token!

        validates :create do
          string :email,    required: true,
                            strong: true,
                            description: "メールアドレス（または、ユーザー名）"
          string :password, required: true,
                            strong: true,
                            description: "パスワード"
          string :fcm_token, strong: true
        end

        def create
          staff = login_staff
          if staff
            render json: staff, status: :ok
          else
            render_error(
              [I18n.t("errors.authentication")], :unprocessable_entity,
            )
          end
        end

        private

          def login_staff
            email = params[:email].to_s
            staff = OrganizationStaff.by_email(email.downcase).first ||
                    OrganizationStaff.where(username: email).first
            if staff && staff.authenticate(params[:password])
              staff.update_fcm_token(params[:fcm_token]) if params[:fcm_token].present?
              staff.regenerate_auth_token
              staff
            end
          end
      end
    end
  end
end
