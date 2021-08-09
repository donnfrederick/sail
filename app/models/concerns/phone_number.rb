module PhoneNumber
  extend ActiveSupport::Concern

  included do
    scope :by_phone_number, ->(phone_number) {
      where(encrypted_phone_number: User.encrypt_phone_number(phone_number))
    }

    attr_encrypted :phone_number,    key: ENV["ENCRYPT_KEY_USER_EMAIL"],
                    mode: :single_iv_and_salt,
                    insecure_mode: true,
                    encode: true
  end

  def full_phone_number
    suffix = if self.phone_number[0] === "0"
                self.phone_number[1, self.phone_number.length - 1]
              else
                self.phone_number
              end
    "+#{international_phone_prefix}#{suffix}"
  end

  def international_phone_prefix
    ISO3166::Country[self.country].try(:country_code)
  end
end
