class UpdateAuthTokenToBeUnique < ActiveRecord::Migration[5.2]
  def up
    remove_index :users, :auth_token
    add_index :users, :auth_token, unique: true
    add_index :users, :web_socket_token, unique: true
    add_index :users, :fcm_token, unique: true
  end

  def down
    remove_index :users, :auth_token
    remove_index :users, :web_socket_token
    remove_index :users, :fcm_token
    add_index :users, :auth_token, index: true
  end
end
