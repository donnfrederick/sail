module Paypal
  class IssueAgreementConnector < ApiConnector
    attr_reader :issue, :agreement

    def initialize(issue)
      @issue = issue
    end

    def retrieve!
      api do
        @agreement ||= Agreement.retrieve!(issue.data_id)
      end
    end
  end
end
