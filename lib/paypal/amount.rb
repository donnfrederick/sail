module Paypal
  class Amount < LooseObject
    attr_reader :value, :currency

    def to_h
      {
        value: value,
        currency: currency
      }
    end

    private

      def parse_value(raw_value)
        raw_value.to_f
      end
  end
end
