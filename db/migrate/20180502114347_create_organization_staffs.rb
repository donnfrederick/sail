class CreateOrganizationStaffs < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_staffs do |t|
      t.references :organization_section, index: true
      t.string   :official_position,      limit: 191
      t.string   :username,               null: true, limit: 191
      t.string   :auth_token,             index: true, limit: 191
      t.string   :fcm_token,              null: true, limit: 191
      t.string   :encrypted_email,        null: false, index: true, limit: 191
      t.string   :password_digest,        null: false, limit: 191
      t.string   :encrypted_phone_number, limit: 191
      t.string   :password_reset_digest,  limit: 191
      t.datetime :password_reset_sent_at
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
