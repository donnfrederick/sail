class AddUniqueOnConversationRequests < ActiveRecord::Migration[5.2]
  def change
    add_index :conversation_requests, [:conversation_id, :from_user_id], unique: true, name: "users_conversation_request_unique_index"
  end
end
