module Paypal
  # @see https://developer.paypal.com/docs/api/payments.billing-plans/v1/
  class Plan < LooseObject
    attr_reader :id, :name, :description, :type, :state, :payment_definitions, :terms,
                :merchant_preferences, :links, :create_time, :update_time

    STATUSES = [
      STATUS_CREATED = "CREATED".freeze,
      STATUS_ACTIVE = "ACTIVE".freeze,
      STATUS_INACTIVE = "INACTIVE".freeze,
      STATUS_ALL = "ALL".freeze, # Request only
    ]

    TYPES = [
      TYPE_FIXED = "FIXED".freeze,
      TYPE_INFINITE = "INFINITE".freeze,
    ]

    def self.all(status = STATUS_ALL)
      pagination = Client.new.api_get("/v1/payments/billing-plans", { status: status })
      pagination.fetch(:plans, []).map do |data|
        new(data)
      end
    end

    def self.create!(attrs)
      default_values = {
        type: "INFINITE",
        payment_definitions: [
          {
            type: "REGULAR",
            frequency: "MONTH",
            frequency_interval: "1",
            amount: {
              currency: "USD"
            },
            cycles: "0",
            charge_models: []
          },
        ],
        merchant_preferences: {
          setup_fee: {
            value: "0",
            currency: "USD"
          },
          # TODO: サービス同意後のジャンプ先
          return_url: ENV["APP_SERVICE_HOST"],
          # TODO: サービス同意をキャンセルするページURL
          cancel_url: "#{ENV["APP_SERVICE_HOST"]}/cancel",
          auto_bill_amount: "YES",
          initial_fail_amount_action: "CANCEL",
          max_fail_attempts: "0"
        }
      }

      data = Client.new.api_post(
        "/v1/payments/billing-plans",
        default_values.deep_merge(attrs)
      )

      new(data).tap do |plan|
        plan.update!(state: STATUS_ACTIVE)
      end
    end

    def self.retrieve!(id)
      data = Client.new.api_get("/v1/payments/billing-plans/#{id}", {})
      new(data)
    end

    def update!(attrs)
      data = [{
          op: "replace",
          path: "/",
          value: attrs
      }]
      Client.new.api_patch("/v1/payments/billing-plans/#{id}", data)
      apply(attrs)
    end

    def destroy!
      # NOTE: PayPal APIではDELETEメソッドはないようです。なんてこった！
      Rails.logger.info "[UNIMPLEMENTED] Paypal::Plan.destroy! is not implemented due to the official API, however it was called now."
    end

    private

      def parse_payment_definitions(list_of_attrs)
        list_of_attrs.map do |attrs|
          PaymentDefinition.new(attrs)
        end
      end

      def parse_links(list_of_attrs)
        list_of_attrs.map do |link|
          Link.new link
        end
      end
  end
end
