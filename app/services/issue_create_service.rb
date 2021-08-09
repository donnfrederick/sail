class IssueCreateService < ApplicationService
  attr_reader :payer, :issue, :package

  def initialize(payer)
    @payer = payer
  end

  def create_by_stripe_charge!(paid_package, stripe_charge)
    succeeded = stripe_charge.try(:paid)
    @package = paid_package
    @issue = StripeIssue.new(
      user_id: payer.id,
      data_id: stripe_charge.try(:id),
      succeeded: succeeded,
      paid_amount: stripe_charge.amount,
      conversations: succeeded ? package.conversations : 0,
      expired_at: succeeded ? package.expires_at : nil,
    )
    @issue.save!
    @issue
  end

  def create_by_stripe_subscription!(paid_package, subscription)
    @package = paid_package
    @issue = StripeIssue.new(
      user_id: payer.id,
      data_id: subscription.id,
      succeeded: true,
      paid_amount: (paid_package.price * 100).to_i,
      conversations: package.conversations,
      expired_at: package.expires_at,
      )
    @issue.save!
    @issue
  end

  def create_by_paypal_order!(paid_package, paypal_order)
    succeeded = paypal_order["status"] == "COMPLETED"
    @package = paid_package
    @issue = PaypalIssue.new(
      user_id: payer.id,
      data_id: paypal_order["id"],
      succeeded: succeeded,
      paid_amount: (paid_package.price * 100).to_i,
      conversations: succeeded ? package.conversations : 0,
      expired_at: succeeded ? package.expires_at : nil,
    )
    @issue.save!
    @issue
  end

  def create_by_paypal_agreement!(paid_package, agreement)
    @package = paid_package
    @issue = PaypalIssue.new(
      user_id: payer.id,
      data_id: agreement.id,
      succeeded: true,
      paid_amount: (package.price * 100).to_i,
      conversations: package.conversations,
      expired_at: package.expires_at,
      )
    @issue.save!
    @issue
  end

  def create_free!(free_package)
    @package = free_package
    @issue = FreeIssue.new(
      user_id: payer.id,
      succeeded: true,
      conversations: package.conversations,
      expired_at: package.expires_at,
      prerogative: true
    )
    @issue.save!
    @issue
  end

  def create_organization_sections!()
    @issue = OrganizationSectionIssue.new(
      user_id: payer.id,
      succeeded: true,
      conversations: 0,
      expired_at: Time.now.since(1.months),
      prerogative: true
    )
    @issue.save!
  end
end
