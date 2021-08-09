class CreateCouponsPricingTables < ActiveRecord::Migration[5.2]
  def change
    create_table :coupons_pricing_tables do |t|
      t.references :coupon, unique: true
      t.references :pricing_table, index: true

      t.timestamps
    end
  end

  def data
    pricing_table = PricingTable.offset(1).limit(1).first
    Coupon.find_each do |coupon|
      CouponsPricingTable.create(
        coupon: coupon,
        pricing_table: pricing_table,
      )
    end
  end
end
