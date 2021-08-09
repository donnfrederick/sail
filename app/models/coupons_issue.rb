# == Schema Information
#
# Table name: coupons_issues
#
#  id              :bigint           not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  issue_id        :bigint
#  users_coupon_id :bigint
#
# Indexes
#
#  coupons_issue_unique                     (users_coupon_id,issue_id) UNIQUE
#  index_coupons_issues_on_issue_id         (issue_id)
#  index_coupons_issues_on_users_coupon_id  (users_coupon_id)
#
class CouponsIssue < ApplicationRecord
  belongs_to :users_coupon
  belongs_to :issue
  delegate :coupon, to: :users_coupon
  delegate :price, to: :issue
end
