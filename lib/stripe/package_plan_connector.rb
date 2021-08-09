module Stripe
  class PackagePlanConnector < ApiConnector
    attr_reader :gateway_plan

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
        plan = if package_property.subscription? && package_property.paid?
                 Stripe::Plan.create({
                                       amount: (package_property.price * 100).to_i,
                                       currency: package_property.currency,
                                       interval: package_property.term,
                                       interval_count: package_property.duration,
                                       product: gateway_product.data_id,
                                     })
               else
                 nil
               end
        gateway_plan.data_id = plan.try(:id)
      end
    end

    def update!(_attrs)
      api do
        # TODO
      end
    end

    def retrieve!
      api do
        if package_property.subscription? && package_property.paid?
          Stripe::Plan.retrieve(gateway_plan_id)
        else
          nil
        end
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
