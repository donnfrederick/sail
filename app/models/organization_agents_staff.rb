# == Schema Information
#
# Table name: organization_agents_staffs
#
#  id                     :bigint(8)        not null, primary key
#  organization_agent_id  :bigint(8)        not null
#  organization_staff_id  :bigint(8)        not null
#  deleted_at             :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class OrganizationAgentsStaff < ApplicationRecord
  belongs_to :organization_agent
  belongs_to :organization_staff
end
