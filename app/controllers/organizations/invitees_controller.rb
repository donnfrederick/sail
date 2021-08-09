module Organizations
  #
  # 招待URLからアクセスしてきたユーザー(未登録者含む)に対するページコントロールを実装します。
  #
  class InviteesController < ApplicationController
    include ::Organizations::Concerns::Language
    layout "organization"

    before_action :the_digest
    before_action :to_siginin, unless: :user_signed_in?, only: [:confirm, :accept]
    before_action :the_invitation, only: [:confirm, :accept]
    before_action :to_invalid, unless: :valid_invitation?, only: [:confirm, :accept]

    # エンドユーザーとしてログイン
    def signin
      redirect_to "/organizations/invitees/#{@digest}/confirm" if user_signed_in?
    end

    # 招待URLを開いてトークンが正常である場合にユーザーがはじめて見るページ
    def confirm
    end

    # 表示のみ
    def invalid
    end

    # confirmページでログイン状態と招待による新規クラス参加が期待した動作であると
    # ユーザーが確認した場合にのみ実行するページ
    #
    # 招待を受け入れ、新規クラス参加をする処理をします。
    def accept
      data = { organization_section_id: @invitation.organization_section_id, user_id: @current_user.id }
      if UsersOrganizationSection.exists?(data) || UsersOrganizationSection.new(data).save
        render "joined"
      else
        flash[:danger] = I18n.t("organization.errors.database_error.title")
        to_siginin
      end
    end

    protected

    def the_invitation
      @invitation ||= Invitation.by_token(@digest).first
    end

    def the_digest
      @digest = params[:digest]
    end

    def to_siginin
      redirect_to "/organizations/invitees/#{params[:digest]}"
    end

    def to_invalid
      redirect_to "/organizations/invitees/invalid"
    end

    def valid_invitation?
      @invitation.present?
    end

    private

    # エンドユーザーとしてログインしているか
    def user_signed_in?
      return false if session[:user_id].blank?

      @current_user = User.find_by(id: session[:user_id])
      @current_user.present?
    end
  end
end
