class AddEncodingStatusToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :encoding_status, :string, limit: 191
  end
end
