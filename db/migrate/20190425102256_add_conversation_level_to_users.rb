class AddConversationLevelToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :conversation_level, :integer, default: 0
  end
end
