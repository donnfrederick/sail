module Organizations
  module Nhs
    class HistoryController < ::Organizations::Users::HistoryController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs

      protected

      def participants
        @current_device = OrganizationDevice.find_by(id: params[:id])
        @current_device.users
      end

      # @deprecated
      def dimensions
        all_devices
      end

      # @deprecated
      def dimension(id)
        OrganizationDevice.find_by(id: id)
      end
    end
  end
end
