class AddIsLateToUsersConversation < ActiveRecord::Migration[5.2]
  def change
    add_column :users_conversations, :is_late, :boolean, default: false, null: false
  end
end
