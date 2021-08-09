module Api
  module V1
    module Paypal
      class SubscriptionsController < ApiController

        validates :create do
          integer :package_property_id, required: true,
                                       description: "PackageProperty.id which made the order"
          string :payment_token,       required: true,
                                       description: "PayPal order ID with agreement"
        end

        def create
          agreement = ::Paypal::Agreement.new({})
          agreement.execute!(params[:payment_token])

          service = IssueCreateService.new(current_user)
          service.create_by_paypal_agreement!(package_property, agreement)

          render json: agreement.to_json
        end

        private

          def package_property
            @package_property ||= PackageProperty.find(params[:package_property_id])
          end
      end
    end
  end
end
