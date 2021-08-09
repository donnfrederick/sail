module Paypal
  # @see https://developer.paypal.com/docs/api/payments.billing-agreements/v1/
  class AgreementDetails < LooseObject
    attr_reader :outstanding_balance, :cycles_remaining, :cycles_completed,
                :next_billing_date, :last_payment_date, :last_payment_amount,
                :final_payment_date, :failed_payment_count

    def to_json
      {
        outstanding_balance: outstanding_balance,
        cycles_remaining: cycles_remaining,
        cycles_completed: cycles_completed,
        next_billing_date: next_billing_date.to_s,
        last_payment_date: last_payment_date.to_s,
        last_payment_amount: last_payment_amount.to_s,
        final_payment_date: final_payment_date.to_s,
        failed_payment_count: failed_payment_count.to_s,
      }
    end

    private

      def parse_cycles_remaining(value)
        value.to_i
      end

      def parse_cycles_completed(value)
        value.to_i
      end

      def parse_last_payment_amount(amount)
        Amount.new(amount)
      end

      def parse_outstanding_balance(amount)
        Amount.new(amount)
      end

      def parse_next_billing_date(time)
        Time.parse(time)
      end

      def parse_last_payment_date(time)
        Time.parse(time)
      end

      def parse_final_payment_date(time)
        Time.parse(time)
      end

      def parse_failed_payment_count(value)
        value.to_i
      end
  end
end
