# == Schema Information
#
# Table name: users_organization_sections
#
#  id                      :bigint(8)        not null, primary key
#  user_id                 :bigint(8)
#  organization_section_id :bigint(8)
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#

class UsersOrganizationSection < ApplicationRecord
  belongs_to :user
  belongs_to :organization_section

  # TODO 現処理に支障がなければコメントアウトを外す
  #validate :duplicated_users_section

  scope :only_tutors, -> {
    includes(:organization_section).where(organization_sections: { tutoring: true })
  }

  private

  def duplicated_users_section
    if UsersOrganizationSection.exists?(user_id: self.user_id, organization_section_id: self.organization_section_id)
      errors[:base] << I18n.t("errors.users_organization_section.duplicated_users_section")
    end
  end
end
