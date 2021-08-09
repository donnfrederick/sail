# == Schema Information
#
# Table name: organization_agents
#
#  id                     :bigint(8)        not null, primary key
#  organization_staff_id  :bigint(8)
#  privilege              :integer
#  deleted_at             :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class OrganizationAgent < ApplicationRecord
  belongs_to :organization_staff

  PRIVILEGES = [
    NOT_PRIVILEGED = 0, # 特権なし
    PRIVILEGED     = 1, # 特権あり
  ].freeze

  validates :privilege, inclusion: { in: PRIVILEGES }

  def privileged?
    self.privilege == PRIVILEGED
  end
end
