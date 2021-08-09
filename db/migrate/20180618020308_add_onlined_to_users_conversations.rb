class AddOnlinedToUsersConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :users_conversations, :onlined, :boolean, default: false, null: false
  end
end
