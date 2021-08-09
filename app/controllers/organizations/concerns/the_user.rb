module Organizations
  module Concerns
    module TheUser
      extend ActiveSupport::Concern

      included do
        # before_action :the_user, only: [:show, :edit, :update, :confirm_to_delete, :destroy]
        # before_action :to_invalid_user, unless: :the_user_exists?, only: [:show, :edit, :update, :confirm_to_delete, :destroy]
      end

      protected

      def the_user_exists?
        @user.present?
      end

      def the_user
        @user = find_role_user_by(id: params[:user_id])
      end

      def to_invalid_user
        flash[:info] = I18n.t("organization.invalid_user")
        redirect_to "/organizations/#{current_staff.nursing_house? ? "nhs" : "univs"}/users/list"
      end
    end
  end
end
