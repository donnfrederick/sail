# == Schema Information
#
# Table name: coupon_owners
#
#  id              :bigint           not null, primary key
#  encrypted_email :string(191)
#  used            :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  coupon_id       :bigint
#  user_id         :bigint
#
# Indexes
#
#  index_coupon_owners_on_coupon_id  (coupon_id)
#  index_coupon_owners_on_user_id    (user_id)
#
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
