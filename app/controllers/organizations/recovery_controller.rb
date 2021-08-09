module Organizations
  #
  # パスワードの再設定を行うページと機能を実装します。
  #
  class RecoveryController < ApplicationController
    include Concerns::Language

    layout "organization"

    before_action :the_digest, :the_staff, only: [:create, :edit, :update]
    before_action :to_invalid_digest, if: :valid_digest?, only: [:edit, :update]
    before_action :to_invalid_email,  if: :valid_digest?, only: :create

    validates :update do
      string :password,  required: true,
                         description: "email"
    end

    # 表示
    def new
    end

    # 処理
    def create
      @staff.create_reset_digest
      @staff.send_password_reset_email
      #flash[:info] = "Email sent with password reset instructions"
      render "created"
    end

    # 表示
    def created
    end

    # 表示
    def edit
    end

    # 処理
    def update
      @staff.password = params[:password]
      if @staff.save
        @staff.nullify_reset_digest
        redirect_to "/organizations/"
      else
        flash[:danger] = I18n.t("organization.errors.database_error.title")
        redirect_to "/organizations/recovery"
      end
    end

    protected

    def the_digest
      @digest = params[:digest]
    end

    def the_email
      @email = params[:email]
    end

    def the_staff
      return @staff if @staff.present?

      if @digest.present?
        @staff ||= OrganizationStaff.by_digest(@digest).first
      elsif @email.present?
        @staff ||= OrganizationStaff.by_email(@email.downcase).first
      end
    end

    def valid_digest?
      @staff.present?
    end

    def to_invalid_digest
      flash[:danger] = I18n.t("organization.recovery.edit.no_longer_available")
      redirect_to "/organizations/recovery"
    end

    def to_invalid_email
      flash[:danger] = I18n.t("organization.recovery.new.not_found")
      redirect_to "/organizations/recovery"
    end
  end
end
