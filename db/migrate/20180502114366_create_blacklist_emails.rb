class CreateBlacklistEmails < ActiveRecord::Migration[5.2]
  def change
    create_table :blacklist_emails do |t|
      t.string :encrypted_email, unique: true, limit: 191

      t.timestamps
    end
  end
end
