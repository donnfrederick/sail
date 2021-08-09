class AddPhoneNumberToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :encrypted_phone_number, :string, null: true, default: nil, limit: 191
    add_index :users, :encrypted_phone_number, unique: true, name: "users_phone_number_uniq"
  end
end
