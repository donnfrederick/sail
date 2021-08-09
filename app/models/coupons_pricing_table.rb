# == Schema Information
#
# Table name: coupons_pricing_tables
#
#  id               :bigint           not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  coupon_id        :bigint
#  pricing_table_id :bigint
#
# Indexes
#
#  index_coupons_pricing_tables_on_coupon_id         (coupon_id)
#  index_coupons_pricing_tables_on_pricing_table_id  (pricing_table_id)
#
class CouponsPricingTable < ApplicationRecord
  belongs_to :coupon
  belongs_to :pricing_table

  validate :any_always_accessible?

  private

    def any_always_accessible?
      pricing_table_ids = CouponsPricingTable.group(:pricing_table_id).count.keys + [self.pricing_table_id]
      unless PricingTable.where.not(id: pricing_table_ids).exists?
        errors[:base] << I18n.t("errors.pricing_table.nothing_always_accessible")
      end
    end
end
