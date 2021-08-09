class PaypalIssue < Issue
  alias_attribute :order_id, :data_id

  scope :by_data_id, ->(data_id) { where(data_id: data_id) }

  def agreement?
    data_id.match(/^I\-/).present?
  end

  def agreement
    connector.retrieve!
  end

  def order?
    !subscription?
  end

  def order
    connector.retrieve!
  end

  def cancel!
    if agreement?
      agreement.cancel!("Cancelled due to Sail procedure")
      super
    end
  end

  private

  def connector
    @connector ||= if agreement?
                     Paypal::IssueAgreementConnector.new(self)
                   elsif charge?
                     Paypal::IssueOrderConnector.new(self)
                   end
  end
end
