class AddUniqueOnCoupons < ActiveRecord::Migration[5.2]
  def change
    add_index :coupons, :code, unique: true, name: "coupons_code_unique"
  end
end
