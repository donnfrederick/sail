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
