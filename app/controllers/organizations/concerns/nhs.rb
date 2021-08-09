module Organizations
  module Concerns
    module Nhs
      extend ActiveSupport::Concern
      extend Authenticator

      included do
        before_action :set_locale
        before_action :devices
        before_action :organization_sections, if: :staff_signed_in?
      end

      # @deprecated
      def organization_sections
        @organization_sections ||= [current_staff.organization_section]
      end

      # @deprecated
      def current_section
        @current_section ||= current_staff.organization_section
      end

      # @deprecated
      def current_organization
        @current_organization ||= current_staff.organization
      end

      def max_user_in_dimension
        Settings.organizations.max_teacher_in_dimension
      end

      protected

      def set_locale
        I18n.locale = "ja"
        @lang = I18n.locale
        session[:org_lang] = @lang
      end

      # @deprecated
      # devicesと違い、sections混在
      def all_devices
        @all_devices ||= [current_staff.organization_device]
      end

      # @deprecated
      def devices
        @devices ||= [current_staff.organization_device]
      end

      def dimension_type
        @dimension_type = "device"
      end

      # @deprecated
      def the_agent_staffs
        @agent_staffs ||= OrganizationAgentsStaff.where(organization_agent_id: agent.id).all.includes(:organization_staff)
      end
    end
  end
end
