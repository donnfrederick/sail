# == Schema Information
#
# Table name: invitations
#
#  id                      :bigint           not null, primary key
#  deleted_at              :datetime
#  token                   :string(191)
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  organization_section_id :bigint
#  organization_staff_id   :bigint
#
# Indexes
#
#  index_invitations_on_organization_section_id  (organization_section_id)
#  index_invitations_on_organization_staff_id    (organization_staff_id)
#

class Invitation < ApplicationRecord
  belongs_to :organization_section
  belongs_to :organization_staff

  scope :by_token, ->(token) { where(token: token) }
  scope :only_available, -> { where(deleted_at: false) }

  def initialize(properties)
    super(properties)
    self.token = new_token
  end

  def expired
    self.deleted_at.nil?
  end

  def expire
    self.destroy
  end

  def url
    "/organizations/invitees/" + self.token
  end

  private

    def new_token
      SecureRandom.urlsafe_base64
    end
end
