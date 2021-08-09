class AddAcceptingRequestsToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :accepting_requests, :boolean, default: false, index: true
  end
end
