class UpdateChannelIdToBeUnique < ActiveRecord::Migration[5.2]
  def up
    change_column :conversations, :channel_id, :string, limit: 191
    add_index :conversations, :channel_id, unique: true
  end

  def down
    remove_index :conversations, :channel_id
    change_column :conversations, :channel_id, :string, index: true
  end
end
