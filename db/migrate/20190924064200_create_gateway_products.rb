class CreateGatewayProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :gateway_products do |t|
      t.references :package_property, index: true
      t.string :gateway, limit: 191, null: false, index: true
      t.string :data_id, limit: 191

      t.timestamps
    end

    add_index :gateway_products, :data_id, unique: true
  end
end
