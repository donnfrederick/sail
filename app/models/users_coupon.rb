class UsersCoupon < ApplicationRecord
  belongs_to :user
  belongs_to :coupon
  has_many :coupons_issues
  has_many :issues, through: :coupons_issues

  def add_usages!
    update!(usages: self.usages + 1)
  end
end
