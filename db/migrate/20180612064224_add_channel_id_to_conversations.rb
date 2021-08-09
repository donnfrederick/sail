class AddChannelIdToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :channel_id, :string, index: true
  end
end
