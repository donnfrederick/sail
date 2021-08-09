class AddUidToAdminUser < ActiveRecord::Migration[5.2]
  def change
    add_column :admin_users, :uid, :string, limit: 191
    add_index :admin_users, [:provider, :uid], unique: true
  end
end
