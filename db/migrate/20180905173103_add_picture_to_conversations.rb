class AddPictureToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :video, :string, limit: 191
  end
end
