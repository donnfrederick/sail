module Stripe
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
        product = if package_property.subscription?
                    Stripe::Product.create({
                                             name: name,
                                             type: 'service',
                                           })
                  else
                    nil
                  end
        gateway_product.data_id = product.try(:id)
      end
    end

    def update!
      api do
        return if package_property.subscription? && package_property.paid?

        if gateway_product_id.nil? || gateway_product_id[0] === "X"
          create!
        else
          Stripe::Product.update(
            gateway_product_id,
            { name: name },
            )
        end
      end
    end

    def exists?
      api do
        gateway_product_id.present? && Stripe::Product.retrieve(gateway_product_id).present?
      end
    rescue => _e
      false
    end

    def destroy!
      api do
        return if gateway_product_id.nil? || gateway_product_id[0] === "X"

        Stripe::Product.delete(gateway_product_id)
      end
    end

    private

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
