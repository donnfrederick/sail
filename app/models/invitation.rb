# == Schema Information
#
# Table name: invitations
#
#  id                      :bigint(8)        not null, primary key
#  organization_section_id :bigint(8)
#  organization_staff_id   :bigint(8)
#  token                   :string(191)
#  deleted_at              :datetime
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
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
