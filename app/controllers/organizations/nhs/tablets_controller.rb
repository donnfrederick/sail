module Organizations
  module Nhs
    class TabletsController < ::Organizations::BaseController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs

      before_action :devices, only: :index
      before_action :device, only: [:edit, :update]

      validates :update do
        integer :organization_device_id,     required: true,
                                             description: "organization device ID"
        string :name,                        required: true,
                                             description: "device name just for you"
      end

      def index
      end

      def edit
      end

      def update
        device.attributes = permitted_params
        if device.errors.empty? && device.save
          redirect_to "/organizations/nhs/tablets"
        else
          render "edit"
        end
      end

      protected

      def device
        @device ||= OrganizationDevice.find_by(id: params[:organization_device_id])
      end

      def devices
        @devices ||= OrganizationDevice.where(organization_section_id: organization_sections.map(&:id)).all
      end

      def permitted_params
        params.permit(:name)
      end
    end
  end
end
