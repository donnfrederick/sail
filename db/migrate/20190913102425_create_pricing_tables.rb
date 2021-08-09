class CreatePricingTables < ActiveRecord::Migration[5.2]
  def change
    create_table :pricing_tables do |t|
      t.references :admin_user, index: true
      t.string :name, null: false
      t.string :package_1_name, null: false
      t.string :package_2_name, null: false
      t.string :package_3_name, null: false
      t.string :package_4_name, null: false
      t.string :package_5_name, null: false
      t.string :package_6_name, null: false
      t.references :package_1, null: false,    references: :conversation_package, index: true
      t.references :package_2, null: false,    references: :conversation_package, index: true
      t.references :package_3, null: false,    references: :conversation_package, index: true
      t.references :package_4, null: false,    references: :conversation_package, index: true
      t.references :package_5, null: false,    references: :conversation_package, index: true
      t.references :package_6, null: false,    references: :conversation_package, index: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
