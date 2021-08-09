module Stripe
  module Webhook
    class Subscription
      attr_reader :data_object

      def initialize(data_object)
        @data_object = data_object
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

      def upcoming!
        # TODO
        Rails.logger.info "[Stripe - invoice.upcoming] #{data.to_json}"
      end

      def expired!
        issue.expired!
      end

      def re_activated!
        renewed!
      end

      def renewed!(extend: nil)
        if period_end.present?
          issue.renew!(expired_at: period_end)
        elsif extend.present?
          issue.renew!(extend: extend)
        else
          # TODO: こちらは本来は例外を投げるべきです
          Rails.logger.error "[Stripe] dangerous assumption of issue expiration: #{data.to_json}"
          issue.renew!(extend: 1.month + 1.week)
        end
      end

      def suspended!
        issue.suspend!
      end

      def updated!
        # nothing to do
      end

      private

        def issue
          @issue ||= StripeIssue.find_by!(data_id: data_object[:subscription])
        end

        def paid?
          data_object[:status].present? && data_object[:status] === "paid"
        end

        def period_end
          row = data_object[:lines].present? && data_object[:lines][:data].present? && data_object[:lines][:data].find do |row|
            row[:subscription].present? && row[:period].present? && row[:period][:end].present?
          end

          Time.at(row[:period][:end] + 1.week.to_i) if row.present?
        rescue
          Rails.logger.error "[Stripe] WebHook event data object has an invalid invoice period: #{data.to_json}"
          nil
        end
    end
  end
end
