class CreateOrganizationDevices < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_devices do |t|
      t.references :organization_staff, index: true
      t.string   :name, null: true, limit: 191
      t.string   :model_number,               limit: 191
      t.string   :property_management_number, limit: 191
      t.datetime :checkout_at
      t.datetime :return_at
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
