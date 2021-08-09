# == Schema Information
#
# Table name: organization_sections
#
#  id              :bigint(8)        not null, primary key
#  organization_id :bigint(8)
#  name_ja         :string(191)
#  name_en         :string(191)
#  deleted_at      :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class OrganizationSection < ApplicationRecord
  include LocalName

  belongs_to :organization
  has_many :organization_staffs
  has_many :organization_devices, through: :organization_staffs
  has_many :users_organization_sections
  has_many :users, through: :users_organization_sections


  accepts_nested_attributes_for :organization_staffs,
                                :organization_devices,
                                reject_if: :all_blank

  scope :order_by_organization, ->{
    includes(:organization).order("organizations.name_ja, organization_sections.id")
  }

  scope :nursing_houses, -> {
    joins(:organization).where(organizations: { industry: Organization::INDUSTRY_NURSING_HOUSE })
  }
  scope :universities, -> {
    joins(:organization).where(organizations: { industry: Organization::INDUSTRY_UNIVERSITY })
  }

  scope :by_organization, ->(organization) {
    where(organization_id: organization.id)
  }

  scope :only_tutoring, -> { where(tutoring: true) }
  scope :statistics, -> { where(statistics: true) }

  after_save :apply_issue_expiry, if: Proc.new { @issue_expired_at_value.present? }

  def name
    if has_attribute? "name_#{I18n.locale}"
      self.try(:send, "name_#{I18n.locale}")
    else
      self.try(:send, "name_#{I18n.default_locale}")
    end
  end

  def breadcrumb_name
    [
        self.organization.try(:name),
        self.name,
    ].compact.join(" > ")
  end

  def paid_users
    users.all.select do |user|
      user.available_issues.by_type(Issue::TYPE_ORGANIZATION_SECTION).where(data_id: self.id).exists?
    end
  end

  def paid?
    paid_users.present?
  end

  def issue_expired_at
    paid_user = paid_users.first
    if paid_user.present?
      organization_section_issue = paid_user.available_issues.by_type(Issue::TYPE_ORGANIZATION_SECTION).where(data_id: self.id).first
      organization_section_issue.expired_at
    end
  end

  def issue_expired_at=(expired_at)
    @issue_expired_at_value = expired_at
  end

  def update_issue_expiry!(expired_at)
    users.each do |user|
      issue = user.issues.by_type(Issue::TYPE_ORGANIZATION_SECTION).where(data_id: self.id).first
      if issue.present?
        issue.update!(expired_at: expired_at)
      else
        OrganizationSectionIssue.create(
            user: user,
            expired_at: expired_at,
            paid_amount: 0,
            conversations: -1,
            data_id: self.id,
            succeeded: true,
        )
      end
    end
  end

  private

    def apply_issue_expiry
      update_issue_expiry!(@issue_expired_at_value)
    end
end
