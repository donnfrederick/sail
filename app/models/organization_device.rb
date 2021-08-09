class OrganizationDevice < ApplicationRecord
  USER_LIMIT = Settings.organizations.max_teacher_in_dimension

  belongs_to :organization_staff
  has_one    :organization_section, through: :organization_staff
  has_one    :organization, through: :organization_section
  has_many   :users

  accepts_nested_attributes_for :users,
                                limit: 8,
                                update_only: true,
                                reject_if: :all_blank

  scope :order_by_organization, ->{
    includes(:organization).order("organizations.name_ja, organization_sections.id")
  }

  validate :staff_has_only_one_device

  validates :users, length: {
                      maximum: USER_LIMIT,
                      message: "1端末に登録できるユーザーは#{USER_LIMIT}人までです",
                    }

  scope :in_section, ->(organization_section) {
    join(organization_staff: :organization_section).where(organization_section: organization_section)
  }

  def cognitive_name
    self.name || self.property_management_number
  end

  def breadcrumb_name
    [
        self.organization.try(:name),
        self.organization_section.try(:name),
        self.property_management_number,
    ].compact.join(" > ")
  end

  private

    def staff_has_only_one_device
      if OrganizationDevice.where(organization_staff: organization_staff).where.not(id: self.id).exists?
        errors[:base] << I18n.t("errors.conversation.staff_has_only_one_device")
      end
    end
end
