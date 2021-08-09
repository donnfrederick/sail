class Admin::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def all
    admin_user = AdminUser.from_omniauth request.env["omniauth.auth"]
    if admin_user
      flash.notice = "Signed in!"
      sign_in_and_redirect admin_user
    else
      flash.notice = "We couldn't sign you in"
      redirect_to new_admin_user_session_url
    end
  end

  alias_method :google_oauth2, :all

  def after_omniauth_failure_path_for(scope)
    new_admin_user_session_url
  end
end
