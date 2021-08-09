module Paypal
  class Payer < LooseObject
    attr_reader :payment_method, :payer_info

    def to_json
      {
        payment_method: payment_method.to_s,
        payer_info: payer_info.to_json,
      }
    end

    private

      def parse_payment_method(method)
        method.to_sym
      end

      def parse_payer_info(value)
        PayerInfo.new(value)
      end
  end
end
