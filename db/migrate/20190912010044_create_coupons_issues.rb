class CreateCouponsIssues < ActiveRecord::Migration[5.2]
  def change
    create_table :coupons_issues do |t|
      t.references :users_coupon
      t.references :issue

      t.timestamps
    end

    add_index :coupons_issues, [:users_coupon_id, :issue_id], unique: true, name: "coupons_issue_unique"
  end
end
