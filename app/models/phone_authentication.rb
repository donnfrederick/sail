# == Schema Information
#
# Table name: phone_authentications
#
#  id                     :bigint           not null, primary key
#  activated              :boolean          default(FALSE)
#  code                   :string(191)      not null
#  country                :string(191)      not null
#  encrypted_phone_number :string(191)      not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_phone_authentications_on_country  (country)
#
class PhoneAuthentication < ApplicationRecord

  include PhoneNumber

  CODE_LENGTH = 4

  scope :by_phone_number, -> (phone_number) {
    where(encrypted_phone_number: PhoneAuthentication.encrypt_phone_number(phone_number))
  }
  scope :by_country, -> (country) { where(country: country) }
  scope :by_code, -> (code) { where(code: code) }

  before_validation :generate_code
  before_save :destroy_all_previous!

  def generate_code
    self.code ||= format("%0#{CODE_LENGTH}d", SecureRandom.random_number(10**CODE_LENGTH))
  end

  def activate!
    update!(activated: true, code: nil)
  end

  private

    def destroy_all_previous!
      PhoneAuthentication.
        by_phone_number(self.phone_number).
        by_country(self.country).
        destroy_all
    end
end
