class ChangePhoneNumberOnPhoneAuthentications < ActiveRecord::Migration[5.2]
  def change
    remove_column :phone_authentications, :phone_number
    add_column :phone_authentications, :encrypted_phone_number, :string, null: false, limit: 191, index: true
  end
end
