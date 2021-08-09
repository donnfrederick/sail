module Api
  module V1
    module Teachers
      class SessionsController < ApiController
        skip_before_action :auth_with_token!, only: [:create]

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
          user = login_user
          if user
            render json: user, serializer: CurrentUserSerializer, status: :ok
          else
            render_error([I18n.t("errors.authentication")], :unprocessable_entity)
          end
        end

        def destroy
          current_user.regenerate_auth_token
          current_user.regenerate_web_socket_token
          head :no_content
        end

        private

        def login_user
          email = params[:email].to_s
          user = Teacher.by_email(email.downcase).first ||
            Teacher.where(username: email).first
          if user && user.authenticate(params[:password])
            user.update_fcm_token(params[:fcm_token]) if params[:fcm_token].present?
            user.regenerate_auth_token
            user.regenerate_web_socket_token
            user.set_timezone
            I18n.locale = user.default_locale
            user
          end
        end
      end
    end
  end
end
