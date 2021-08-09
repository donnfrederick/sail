module Gateway
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
        gateway_plan.data_id = nil
      end
    end

    def update!(_attrs)
      api do
        # nothing to do
      end
    end

    def retrieve!
      api do
        nil
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
