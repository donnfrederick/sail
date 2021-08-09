class DropToUserIdFromConversationRequests < ActiveRecord::Migration[5.2]
  def change
    remove_column :conversation_requests, :to_user_id
  end
end
