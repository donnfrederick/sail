module Paypal
  class PackagePlanConnector < ApiConnector
    attr_reader :gateway_plan, :plan

    def initialize(gateway_plan)
      @gateway_plan = gateway_plan
    end

    def package_property
      gateway_plan.package_property
    end

    def gateway_plan_id
      gateway_plan.data_id
    end

    def gateway_product
      gateway_plan.gateway_product
    end

    def create!
      api do
        @plan = if package_property.subscription? && package_property.paid?
                 Plan.create!({
                                name:  name,
                                description: description,
                                payment_definitions: [
                                  {
                                    name: name,
                                    type: "REGULAR",
                                    frequency: package_property.term.upcase,
                                    frequency_interval: package_property.duration,
                                    amount: {
                                      value: package_property.price.to_f,
                                      currency: package_property.currency.upcase
                                    },
                                  },
                                ],
                              })
               else
                 nil
               end
        gateway_plan.data_id = @plan.try(:id)
      end
    end

    def update!(attrs)
      api do
        retrieve!.update!(attrs) if gateway_plan_id.present?
      end
    end

    def retrieve!
      api do
        @plan = Plan.retrieve!(gateway_plan_id) if gateway_plan_id.present?
      end
    end

    def name
      # TODO
      package_property.id
    end

    def description
      # TODO
      "package_property##{package_property.id}"
    end
  end
end
