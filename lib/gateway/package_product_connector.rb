module Gateway
  class PackageProductConnector < ApiConnector
    attr_reader :gateway_product

    def initialize(gateway_product)
      @gateway_product = gateway_product
    end

    def package_property
      gateway_product.package_property
    end

    def gateway_product_id
      gateway_product.data_id
    end

    def create!
      api do
        gateway_product.data_id = nil
      end
    end

    def update!
      api do
        # nothing to do
      end
    end

    def exists?
      api do
        true
      end
    end

    def destroy!
      api do
        # nothing to do
      end
    end
  end
end
