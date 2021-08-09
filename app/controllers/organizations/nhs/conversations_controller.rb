module Organizations
  module Nhs
    class ConversationsController < ::Organizations::Users::ConversationsController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs

      def calendar(offset = 6)
        super(offset)
        @capacity = max_user_in_dimension
      end

      protected

      def participants
        @current_device ||= OrganizationDevice.find_by(id: params[:id])
        @current_device.users
      end

      def dimension_by_conversation(conversation)
        conversation.teacher.organization_device
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
