
module Organizations
  module Univs
    class NotificationsController < ::Organizations::Users::NotificationsController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Univs

      before_action :sections, only: [:new, :edit]
      before_action :notification, only: [:show, :edit, :update, :confirm_to_delete, :destroy, :confirm_before_publish, :publish, :confirm_before_unpublish, :unpublish]

      validates :create do
        string :target_section_id,     required: true,
                                       description: "organization section"
        string :title_ja,              required: true,
                                       description: "notification title"
        string :title_en,              required: true,
                                       description: "notification title"
        string :body_ja,               required: true,
                                       description: "notification body"
        string :body_en,               required: true,
                                       description: "notification body"
      end

      validates :update do
        string :target_section_id,     required: true,
                                       description: "organization section"
        string :title_ja,              required: true,
                                       description: "notification title"
        string :title_en,              required: true,
                                       description: "notification title"
        string :body_ja,               required: true,
                                       description: "notification body"
        string :body_en,               required: true,
                                       description: "notification body"
      end

      validates :publish do
        string :notification_id,      required: true,
                                      description: "notification id"
      end

      def index
        @notifications = Notification.editable.by_section(current_staff.organization_section)
      end

      def new
      end

      def create
        data = permitted_params.clone
        data[:organization_staff] = current_staff
        notification_ = Notification.new(data)
        return redirect_to view_context.org_notification_list_path(role_type) if notification_.save

        flash[:danger] = I18n.t("organization.errors.database_error.title")
      end

      def edit
        redirect_to view_context.org_notification_list_path(role_type) if notification.blank?
      end

      def update
        redirect_to view_context.org_notification_list_path(role_type) if notification.blank?

        notification.attributes = permitted_params
        if notification.save
          redirect_to view_context.org_notification_list_path(role_type)
        else
          redirect_to view_context.org_notification_edit_path(role_type, params[:id])
        end
      end

      def confirm_before_publish
      end

      def publish
        if notification.present?
          notification.notificated_at = Time.zone.now
          notification.save
        end
        redirect_to view_context.org_notification_list_path(role_type)
      end

      def confirm_before_unpublish
      end

      def unpublish
        if notification.present?
          notification.notificated_at = nil
          notification.save
        end
        redirect_to view_context.org_notification_list_path(role_type)
      end

      def confirm_to_delete
        redirect_to view_context.org_notification_list_path(role_type) if notification.blank?
      end

      def destroy
        notification.destroy if notification.present?
        redirect_to view_context.org_notification_list_path(role_type)
      end

      protected

      def permitted_params
        params.permit(:title_ja, :title_en, :body_ja, :body_en, :target_section_id)
      end

      # @deprecated
      def sections
        @sections = [current_staff.organization_section]
      end

      def notification
        @notification ||= Notification.find_by(id: params[:notification_id])
      end
    end
  end
end
