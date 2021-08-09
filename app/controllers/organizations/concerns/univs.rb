module Organizations
  module Concerns
    module Univs
      extend ActiveSupport::Concern

      included do
        before_action :set_locale
      end

      # @deprecated
      # TODO 本来スタッフが全セクションに対して権限を持っていない限りこれはおかしい値を返しています
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
        Settings.organizations.max_student_in_dimension
      end

      protected

      def set_locale
        I18n.locale = "en"
        @lang = I18n.locale
        session[:org_lang] = @lang
      end

      def dimension_type
        @dimension_type = "section"
      end
    end
  end
end
