class CouponsIssue < ApplicationRecord
  belongs_to :users_coupon
  belongs_to :issue
  delegate :coupon, to: :users_coupon
  delegate :price, to: :issue
end
