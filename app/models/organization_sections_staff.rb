# @deprecated
class OrganizationSectionsStaff < ApplicationRecord
  belongs_to :organization_section
  belongs_to :organization_staff

  scope :by_primary, ->(conditions) {
    conditions[:is_primary] = true
    where(conditions)
  }

  scope :primary_for, ->(conditions) {
    primary = by_primary(conditions).first
    unless primary.present?
      sub_primary = where(conditions).first
      sub_primary.is_primary = true
      sub_primary.save
    end
    by_primary(conditions).first
  }

  # 重複を解決しながらprimaryを現在のオブジェクトに変更する
  def update_primary
    conditions = { organization_staff_id: self.organization_staff_id }
    extra = { is_primary: false }
    by_primary(conditions).each do |pair|
      pair.update_attributes = extra
    end

    self.is_primary = true
    self.save
  end
end
