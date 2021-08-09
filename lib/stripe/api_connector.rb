module Stripe
  class ApiConnector
    def api
      Stripe.api_key ||= SiteConfig.find_by_keyword("payment.stripe.api_secret_key") || ENV["STRIPE_API_KEY"]

      yield
    end
  end
end
