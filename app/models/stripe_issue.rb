class StripeIssue < Issue
  alias_attribute :charge_id, :data_id

  def subscription?
    data_id.match(/^sub_/).present?
  end

  def subscription
    connector.retrieve!
  end

  def charge?
    data_id.match(/^ch_/).present?
  end

  def charge
    connector.retrieve!
  end

  def cancel!
    connector.cancel!
    super
  end

  private

    def connector
      @connector ||= if subscription?
                       Stripe::IssueSubscriptionConnector.new(self)
                     elsif charge?
                       Stripe::IssueChargeConnector.new(self)
                     end
    end
end
