module Paypal
  class PaymentDefinition < LooseObject
    attr_reader :name, :type, :frequency, :frequency_interval, :amount,
                :cycles, :charge_models

    def regular?
      self.type === "REGULAR"
    end

    def duration
      case frequency
      when "Month"
        frequency_interval.months
      when "Week"
        frequency_interval.weeks
      when "Year"
        frequency_interval.years
      else
        nil
      end
    end

    private

      def parse_amount(attrs)
        Amount.new(attrs)
      end

      def parse_charge_models(list_of_attrs)
        list_of_attrs.map do |attrs|
          ChargeModel.new(attrs)
        end
      end

      def parse_cycles(value)
        value.to_i
      end

      def parse_frequency_interval(value)
        value.to_i
      end
  end
end
