# == Schema Information
#
# Table name: organization_agents
#
#  id                    :bigint           not null, primary key
#  deleted_at            :datetime
#  privilege             :integer          default(0)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  organization_staff_id :bigint
#
# Indexes
#
#  index_organization_agents_on_organization_staff_id  (organization_staff_id)
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
