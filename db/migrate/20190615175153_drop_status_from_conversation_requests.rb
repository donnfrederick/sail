class DropStatusFromConversationRequests < ActiveRecord::Migration[5.2]
  def change
    remove_column :conversation_requests, :status
  end
end
