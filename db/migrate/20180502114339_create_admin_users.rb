class CreateAdminUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :admin_users do |t|
      t.string   :provider,        limit: 191
      t.string   :email,           limit: 191
      t.string   :role,            limit: 191
      t.string   :last_sign_in_ip, limit: 191
      t.datetime :last_sign_in_at
      t.timestamps
    end
  end
end
