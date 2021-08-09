# いずれのアカウントも共通してこのページでログインを行います。
# ログイン後にそのアカウントに応じて表示すべきページを切り替えます。
# そのため、このページ階層にはログイン・ログアウトの処理以外には
# 実装予定はありません。
class OrganizationsController < ApplicationController
  include Organizations::Concerns::Language
  include Organizations::Concerns::Authenticator

  layout "organization"

  before_action :auth_with_session!
  skip_before_action :auth_with_session!, only: [:signin, :create, :destroy]
  before_action :lang
  add_flash_types :danger

  validates :create do
    string :email,    required: true,
                      strong: true,
                      description: "email or username"
    string :password, required: true,
                      strong: true,
                      description: "password"
  end

  def signin
    redirect_to :organizations_univs_users if staff_signed_in?
  end

  def create
    staff = authed_staff_by(params[:email], params[:password])

    if staff.present? && staff_signed_in?
      redirect_to :organizations_univs_users
    else
      flash[:danger] = I18n.t("organization.invalid_signin")
      redirect_to view_context.org_path
    end
  end

  def destroy
    deauthed_staff
    redirect_to view_context.org_path
  end

  protected

  def lang
    @lang = params[:lang].present? ? params[:lang] : "ja"
  end

  private

  def member_url
    role_type = current_staff.nursing_house? ? "nhs" : "univs"
    view_context.org_path(role_type)
  end
end
