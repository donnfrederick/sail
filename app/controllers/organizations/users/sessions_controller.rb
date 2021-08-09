module Organizations
  module Users
    # エンドユーザーのログイン (管理ページの権限はないので注意)
    class SessionsController < ApplicationController
      validates :create do
        string :email,     required: true,
                           description: "email"
        string :password,  required: true,
                           description: "password"
      end

      # セッションを開始する
      def create
        user = authed_user(params[:email], params[:password])
        if user
          session[:user_id] = user.id
          redirect_to view_context.org_invitation_confirm_accept_path(params[:digest])
        else
          flash[:danger] = "Email or password is wrong"
          redirect_to view_context.org_invitation_signin_path(params[:digest])
        end
      end

      private

        def authed_user(email, password)
          user = User.by_email_with_downcase(email).first
          user if user && user.authenticate(password)
        end
    end
  end
end
