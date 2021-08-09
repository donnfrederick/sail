module Paypal
  module Webhook
    class Subscription
      attr_reader :resource

      def initialize(resource)
        @resource = resource
      end

      def activated!
        renewed!
      end

      def cancelled!
        issue.cancel!
      end

      def created!
        # nothing to do
      end

      def expired!
        issue.expired!
      end

      def re_activated!
        renewed!
      end

      def renewed!(extend: nil)
        duration = if extend.nil?
                     plan = issue.agreement.plan
                     regular_payment_definition = plan.payment_definitions.find(&:regular?)
                     regular_payment_definition.duration
                   else
                     extend
                   end
        issue.renew!(extend: duration)
      end

      def suspended!
        issue.suspend!
      end

      def updated!
        # nothing to do
      end

      private

        def issue
          @issue ||= PaypalIssue.find_by!(data_id: resource[:id])
        end

        def agreement
          @agreement ||= issue.agreement
        end
    end
  end
end
