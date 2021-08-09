class AddStartAtEndAtToConversationRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :conversation_requests, :start_at, :datetime, index: true
    add_column :conversation_requests, :end_at,   :datetime, index: true
  end
end
