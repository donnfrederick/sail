class CouponOwner < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :coupon

  attr_encrypted :email,    key: ENV["ENCRYPT_KEY_USER_EMAIL"],
                 mode: :single_iv_and_salt,
                 insecure_mode: true,
                 encode: true

  scope :by_email, ->(email) {
    where(encrypted_email: CouponOwner.encrypt_email(email.strip.downcase))
  }
end
