module Paypal
  # @see https://developer.paypal.com/docs/api/payments.billing-agreements/v1/#billing-agreements_transactions
  class AgreementTransaction < LooseObject
    attr_reader :transaction_id, :status, :transaction_type,
                :amount, :fee_amount, :net_amount,
                :payer_email, :payer_name, :time_stamp, :time_zone

    def self.all(agreement_id, params = nil)
      params = {} if params.nil?
      data = Client.new.api_get("/v1/payments/billing-agreements/#{agreement_id}", params)
      data.fetch(:agreement_transaction_list, []).map do |attrs|
        new(attrs)
      end
    end

    private

      def parse_amount(value)
        Amount.new(value)
      end

      def parse_fee_amount(value)
        Amount.new(value)
      end

      def parse_net_amount(value)
        Amount.new(value)
      end

      def parse_time_stamp(time)
        Time.parse(time)
      end
  end
end
