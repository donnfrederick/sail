module Webhook
  module V1
    class PaypalController < WebhookController
      validates :event do
        string :event_type, required: true,
                            description: "PayPal Webbook event_type attribute"

        any :resource, required: true,
                       description: "PayPal resource data"
      end

      def event
        Rails.logger.info "[WebHook] PayPal sent: #{params.to_json}"

        case params[:event_type]
        when "BILLING.SUBSCRIPTION.ACTIVATED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.activated!
        when "BILLING.SUBSCRIPTION.CANCELLED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.cancelled!
        when "BILLING.SUBSCRIPTION.CREATED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.created!
        when "BILLING.SUBSCRIPTION.EXPIRED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.expired!
        when "BILLING.SUBSCRIPTION.RE-ACTIVATED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.re_activated!
        when "BILLING.SUBSCRIPTION.RENEWED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.renewed!
        when "BILLING.SUBSCRIPTION.SUSPENDED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.suspended!
        when "BILLING.SUBSCRIPTION.UPDATED"
          subscription = ::Paypal::Webhook::Subscription.new(params[:resource])
          subscription.updated!
        end

        render json: {}, status: :ok
      end
    end
  end
end
