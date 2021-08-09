module Api
  module V1
    module Paypal
      class SubscriptionsController < ApiController

        validates :create do
          integer :package_property_id, required: true,
                                       description: "PackageProperty.id which made the order"
          string :subscription_id,     required: true,
                                       description: "PayPal subscription ID with agreement"
        end

        def create

          service = IssueCreateService.new(current_user)
          service.create_by_paypal_agreement!(package_property, params[:subscription_id])

        end

        private

          def package_property
            @package_property ||= PackageProperty.find(params[:package_property_id])
          end
      end
    end
  end
end
