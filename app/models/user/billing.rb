class User < ApplicationRecord
  has_many :issues
  has_many :available_issues, -> { available }, class_name: "Issue"

  def trial?
    available_issues.by_type(Issue::TYPE_FREE).prerogative(false).exists?
  end

  def free?
    available_issues.by_type(Issue::TYPE_FREE).exists?
  end

  # 注意: organization_section_paid?が正の場合を含みます
  def paid?
    !free? && available_issues.exists?
  end

  def organization_section_paid?
    !free? && available_issues.by_type(Issue::TYPE_ORGANIZATION_SECTION).exists?
  end

  def subscribing?
    available_issues.subscription.exists?
  end

  def available_conversation_count
    available_issues.pluck(:conversations).sum
  end
end
