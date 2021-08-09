class AddDeletedAtToReservableConversation < ActiveRecord::Migration[5.2]
  def change
    add_column :reservable_conversations, :deleted_at, :datetime, index: true
  end
end
