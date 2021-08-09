class UpdateEncryptedEmailToBeUnique < ActiveRecord::Migration[5.2]
  def up
    add_index :users, :encrypted_email, unique: true
  end

  def down
    remove_index :users, :encrypted_email
  end
end
