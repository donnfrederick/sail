class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.references :organization_device, index: true

      # for STI
      t.string   :type, index: true, limit: 191

      # for student
      t.string   :provider,        limit: 191
      t.string   :encrypted_uid,   unique: true, limit: 191

      # API token
      t.string   :auth_token,      index: true, limit: 191

      t.string   :username,        limit: 191
      t.string   :name_ja,         limit: 191
      t.string   :name_en,         limit: 191
      t.integer  :sex,             default: 0
      t.string   :picture,         limit: 191
      t.string   :country,         limit: 191
      t.string   :timezone,        limit: 191
      t.string   :encrypted_email, unique: true, limit: 191
      t.string   :password_digest, limit: 191
      t.string   :encrypted_birthday, limit: 191
      t.string   :activation_digest,  limit: 191
      t.integer  :level
      t.integer  :desired_condition
      t.string   :web_socket_token,   limit: 191, unique: true
      t.boolean  :is_activated
      t.datetime :activated_at
      t.datetime :activation_sent_at
      t.string   :password_reset_digest, limit: 191
      t.datetime :password_reset_sent_at
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
