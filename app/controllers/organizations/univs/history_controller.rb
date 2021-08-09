module Organizations
  module Univs
    class HistoryController < ::Organizations::Users::HistoryController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Univs

      protected

      def participants
        @current_dimension = OrganizationSection.find_by(id: params[:id])
        @current_section = @current_dimension
        @current_dimension.users
      end

      # @deprecated
      def dimensions
        [current_staff.organization_section]
      end

      # @deprecated
      def dimension(id)
        OrganizationSection.find_by(id: id)
      end
    end
  end
end
