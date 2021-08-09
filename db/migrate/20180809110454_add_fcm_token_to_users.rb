class AddFcmTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :fcm_token, :string, null: true, limit: 191
  end
end
