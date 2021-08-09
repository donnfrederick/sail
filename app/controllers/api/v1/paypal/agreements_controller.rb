module Api
  module V1
    module Paypal
      class AgreementsController < ApiController
        def create
          agreement = ::Paypal::Agreement.create!({
                                                    name: plan.name,
                                                    description: plan.description,
                                                    start_date: (Time.now + 3.days).iso8601,
                                                    plan: {
                                                      id: plan.data_id
                                                    },
                                                    payer: {
                                                      payment_method: "paypal",
                                                      payer_info: {
                                                        email: current_user.email
                                                      }
                                                    }
                                                  })
          render json: { token: agreement.payment_token }
        end

        private

          def package_property
            @package_property ||= PackageProperty.find(params[:package_property_id])
          end

          def plan
            package_property.gateway_plans.paypal.first
          end
      end
    end
  end
end
