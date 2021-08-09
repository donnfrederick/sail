# == Schema Information
#
# Table name: organization_agents_staffs
#
#  id                    :bigint           not null, primary key
#  deleted_at            :datetime
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  organization_agent_id :bigint
#  organization_staff_id :bigint
#
# Indexes
#
#  index_organization_agents_staffs_on_organization_agent_id  (organization_agent_id)
#  index_organization_agents_staffs_on_organization_staff_id  (organization_staff_id)
#

class OrganizationAgentsStaff < ApplicationRecord
  belongs_to :organization_agent
  belongs_to :organization_staff
end
