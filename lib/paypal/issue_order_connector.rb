module Paypal
  class IssueOrderConnector < ApiConnector
    attr_reader :issue, :order

    def initialize(issue)
      @issue = issue
    end

    def retrieve!
      api do
        @order ||= Order.retrieve!(issue.data_id)
      end
    end
  end
end
