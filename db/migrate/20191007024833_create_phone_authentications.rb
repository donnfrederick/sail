class CreatePhoneAuthentications < ActiveRecord::Migration[5.2]
  def change
    create_table :phone_authentications do |t|
      t.string :country, null: false, limit: 191, index: true
      t.string :phone_number, null: false, limit: 191, index: true
      t.string :code, null: false, limit: 191
      t.boolean :activated, default: false
      t.timestamps
    end
  end
end
