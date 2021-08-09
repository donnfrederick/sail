module Paypal
  # @see https://developer.paypal.com/docs/api/catalog-products/v1/
  class Order < LooseObject

    def self.retrieve!(id)
      data = Client.new.api_get("/v2/checkout/orders/#{id}", {})
      new(data)
    end
  end
end
