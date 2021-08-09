class CreateCouponOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :coupon_owners do |t|
      t.references :user, unique: true
      t.string   :encrypted_email, unique: true, limit: 191
      t.boolean  :used, default: false

      t.timestamps
    end
  end
end
