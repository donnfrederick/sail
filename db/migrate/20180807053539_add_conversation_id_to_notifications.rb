class AddConversationIdToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :conversation_id, :bigint, null: true
  end
end
