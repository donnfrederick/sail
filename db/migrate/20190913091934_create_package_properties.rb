class CreatePackageProperties < ActiveRecord::Migration[5.2]
  def change
    create_table :package_properties do |t|
      t.string :original_price, null: false, default: "0"
      t.string :discounted_price, default: nil
      t.string :currency, null: false, default: "usd"
      t.integer :duration, default: 1
      t.integer :original_conversations, null: false, default: 0
      t.integer :bonus_conversations, null: false, default: 0
      t.datetime :expired_at
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
