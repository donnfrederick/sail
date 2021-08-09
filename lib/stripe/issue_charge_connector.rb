module Stripe
  class IssueChargeConnector < ApiConnector
    attr_reader :issue, :charge

    def initialize(issue)
      @issue = issue
    end

    def retrieve!
      api do
        @charge ||= Charge.retrieve(issue.data_id)
      end
    end
  end
end
