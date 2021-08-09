# == Schema Information
#
# Table name: users_coupons
#
#  id         :bigint           not null, primary key
#  usages     :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  coupon_id  :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_users_coupons_on_coupon_id  (coupon_id)
#  index_users_coupons_on_user_id    (user_id)
#  users_coupon_unique               (user_id,coupon_id) UNIQUE
#
class UsersCoupon < ApplicationRecord
  belongs_to :user
  belongs_to :coupon
  has_many :coupons_issues
  has_many :issues, through: :coupons_issues

  def add_usages!
    update!(usages: self.usages + 1)
  end
end
