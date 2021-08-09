class AddConversationToConversationRequests < ActiveRecord::Migration[5.2]
  def change
    add_reference :conversation_requests, :conversation, foreign_key: true
  end
end
