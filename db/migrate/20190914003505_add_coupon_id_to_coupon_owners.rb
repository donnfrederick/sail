class AddCouponIdToCouponOwners < ActiveRecord::Migration[5.2]
  def change
    add_reference :coupon_owners, :coupon, foreign_key: { to_table: :coupons }
  end

  def data
    CouponOwner.reset_column_information
    Coupon.reset_column_information

    coupon = Coupon.first

    import_dir = Rails.root.join("db/datasources/20190903082341/").to_s
    file = "coupon_owners.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                CouponOwner.where(id: resource[:id]).first_or_initialize
              else
                CouponOwner.where(resource).first_or_initialize
              end

      resource.merge!({ coupon_id: coupon.id })
      model.attributes = resource
      model.save!
    end
  end
end
