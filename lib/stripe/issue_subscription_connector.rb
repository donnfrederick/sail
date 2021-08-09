module Stripe
  class IssueSubscriptionConnector < ApiConnector
    attr_reader :issue, :subscription

    def initialize(issue)
      @issue = issue
    end

    def retrieve!
      api do
        @subscription ||= Subscription.retrieve(issue.data_id)
      end
    end

    def cancel!
      api do
        @subscription = Subscription.delete(issue.data_id)
      end
    end
  end
end
