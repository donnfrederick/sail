class OrganizationStaff < ApplicationRecord
  concerned_with :flexible_attributes

  include PasswordReset

  concerned_with :authenticate

  extend AttrEncrypted
  attr_accessor :email
  attr_accessor :password_remember_token, :password_activation_token, :password_reset_token

  has_secure_password # save to password_digest column
  has_secure_token :auth_token

  belongs_to :organization_section, optional: true
  has_one :organization, through: :organization_section
  has_one :organization_device

  delegate :nursing_house?, :university?, to: :organization

  attr_encrypted :email,        key: ENV["ENCRYPT_KEY_STAFF_EMAIL"],
                                mode: :single_iv_and_salt,
                                insecure_mode: true,
                                encode: true
  attr_encrypted :phone_number, key: ENV["ENCRYPT_KEY_STAFF_PHONE_NUMBER"],
                                mode: :single_iv_and_salt,
                                insecure_mode: true,
                                encode: true

  accepts_nested_attributes_for :organization_device,
                                limit: 1,
                                update_only: true,
                                reject_if: :all_blank

  scope :by_email, ->(email) {
    where(encrypted_email: OrganizationStaff.encrypt_email(email))
  }

  scope :by_email_with_downcase, ->(email) {
    by_email(email.strip.downcase)
  }

  scope :by_phone_number, ->(phone_number) {
    where(encrypted_phone_number: OrganizationStaff.encrypt_phone_number(phone_number))
  }

  scope :nursing_houses, -> { joins(:organization).where(organizations: { industry: Organization::INDUSTRY_NURSING_HOUSE }) }
  scope :universities,   -> { joins(:organization).where(organizations: { industry: Organization::INDUSTRY_UNIVERSITY }) }

  before_save { set_email_downcase }

  after_save { set_timezone }

  def set_email_downcase
    # 新規登録時のみ
    self.email = email.strip.downcase unless self.try(:created_at).present?
  end

  # @deprecated organization_deviceとorganization_sectionの関係でこのメソッドは正しくない関係を返す可能性があるので非推奨
  def organization_sections
    [organization_section]
  end

  def set_timezone
    Time.zone = if self.try(:timezone).present?
      self.timezone
    elsif self.organization.present? && self.organization.university?
      "Asia/Bangkok"
    else
      "Asia/Tokyo"
    end
  end

  # Override
  def password_reset_url
    File.join(SERVICE_HOST, "/organizations/recovery/", self.password_reset_digest, "/edit/")
  end

  def update_fcm_token(fcm_token)
    OrganizationStaff
      .where(fcm_token: fcm_token)
      .where.not(id: self.id)
      .update_all(fcm_token: nil)

    update(fcm_token: fcm_token)
  end
end
