module Paypal
  class ApiConnector
    def api
      # 特にやることはないがStripeとインターフェースを統一します
      yield
    end
  end
end
