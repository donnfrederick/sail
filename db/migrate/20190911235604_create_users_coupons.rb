class CreateUsersCoupons < ActiveRecord::Migration[5.2]
  def change
    create_table :users_coupons do |t|
      t.references :user
      t.references :coupon
      t.integer :usages, default: 0

      t.timestamps
    end

    add_index :users_coupons, [:user_id, :coupon_id], unique: true, name: "users_coupon_unique"
  end
end
