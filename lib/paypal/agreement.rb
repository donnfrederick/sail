module Paypal
  # @see https://developer.paypal.com/docs/api/payments.billing-agreements/v1/
  class Agreement < LooseObject
    attr_reader :id, :name, :description, :state, :start_date, :payer, :plan, :shipping_address,
                :override_merchant_preferences, :agreement_details, :links

    STATUSES = [
      STATUS_PENDING = "Pending".freeze,
      STATUS_ACTIVE = "Active".freeze,
      STATUS_SUSPENDED = "Suspended".freeze,
      STATUS_CANCELLED = "Cancelled".freeze,
      STATUS_EXPIRED = "Expired".freeze,
    ]

    TYPES = [
      TYPE_FIXED = "FIXED".freeze,
      TYPE_INFINITE = "INFINITE".freeze,
    ]

    def self.all(status = STATUS_ALL)
      pagination = Client.new.api_get("/v1/payments/billing-agreements", { status: status })
      pagination.fetch(:plans, []).map do |data|
        new(data)
      end
    end

    def self.create!(attrs)
      attrs = attrs.tap do |attrs_|
        if attrs_.fetch(:plan).nil? && attrs_[:plan].is_a?(Plan)
          attrs_[:plan] = { id: attrs_[:plan].id }
        end
        if attrs_.fetch(:payer).nil? && attrs_[:payer].fetch(:payer_info).nil? && attrs_[:payer][:payer_info].is_a?(User)
          attrs_[:payer][:payer_info] = { email: attrs_[:payer][:payer_info].email }
        end
      end

      data = Client.new.api_post("/v1/payments/billing-agreements", attrs)

      new(data)
    end

    def self.retrieve!(id)
      data = Client.new.api_get("/v1/payments/billing-agreements/#{id}", {})
      new(data)
    end

    def update!(attrs)
      data = [{
          op: "replace",
          path: "/",
          value: attrs
      }]
      Client.new.api_patch("/v1/payments/billing-agreements/#{id}", data)
      apply(attrs)
    end

    def destroy!
      # NOTE: PayPal APIではDELETEメソッドはないようです。なんてこった！
      Rails.logger.info "[UNIMPLEMENTED] Paypal::Plan.destroy! is not implemented due to the official API, however it was called now."
    end

    def bill_balance!(note)
      data = { note: note }
      Client.new.api_post("/v1/payments/billing-agreements/#{id}/bill-balance", data)
    end

    def cancel!(note)
      data = { note: note }
      Client.new.api_post("/v1/payments/billing-agreements/#{id}/cancel", data)
    end

    def reactive!(note)
      data = { note: note }
      Client.new.api_post("/v1/payments/billing-agreements/#{id}/re-activate", data)
    end

    def set_balance!(amount)
      data = amount.to_h
      Client.new.api_post("/v1/payments/billing-agreements/#{id}/re-activate", data)
    end

    def suspend!(note)
      data = { note: note }
      Client.new.api_post("/v1/payments/billing-agreements/#{id}/suspend", data)
    end

    def execute!(payment_token)
      data = Client.new.api_post("/v1/payments/billing-agreements/#{payment_token}/agreement-execute", {})
      apply(data)
    end

    def to_json
      {
        id: id,
        name: name,
        description: description,
        state: state,
        start_date: start_date,
        payer: payer.to_json,
        plan: plan.to_json,
        shipping_address: shipping_address,
        override_merchant_preferences: override_merchant_preferences,
        agreement_details: agreement_details.to_json,
        links: links.map(&:to_json),
      }
    end

    def payment_token
      return unless approval_link.present?

      matches = approval_link.href.match(/EC-\w+/)
      matches[0] if matches[0].present?
    end

    def approval_link
      links.find {|link| link.rel === "approval_url" }
    end

    private

      def parse_start_date(value)
        Time.parse(value)
      end

      def parse_plan(attrs)
        Plan.new(attrs)
      end

      def parse_links(list_of_attrs)
        list_of_attrs.map do |attrs|
          Link.new(attrs)
        end
      end

      def parse_agreement_details(attrs)
        AgreementDetails.new(attrs)
      end

      def override_charge_models(list_of_attrs)
        list_of_attrs.map do |charge_model|
          ChargeModel.new charge_model
        end
      end
  end
end
