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
