module Paypal
  class ChargeModel < LooseObject
    attr_reader :type, :amount

    TYPES = [
      TYPE_TAX = "TAX".freeze,
      TYPE_SHIPPING = "SHIPPING".freeze,
    ]

    private

      def parse_amount(attrs)
        Amount.new(attrs)
      end
  end
end
