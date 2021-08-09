module Webhook
  module V1
    class StripeController < WebhookController
      validates :event do
        string :type, required: true, description: "Stripe WebHook event type"
        any :data,    required: true,description: "Stripe event data object"
      end

      def event
        Rails.logger.info "[WebHook] Stripe sent: #{params.to_json}"

        if params[:data].present? && params[:data][:object].present?
          case params[:type]
          when "invoice.payment_succeeded"
            subscription = ::Stripe::Webhook::Subscription.new(params[:data][:object])
            subscription.renewed!
          when "invoice.payment_failed"
            subscription = ::Stripe::Webhook::Subscription.new(params[:data][:object])
            subscription.suspended!
          end
        end

        head :ok
      end
    end
  end
end
