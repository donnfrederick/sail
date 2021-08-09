class AddOriginalCreatedAtToCancelledConversation < ActiveRecord::Migration[5.2]
  def change
    add_column :cancelled_conversations, :original_created_at, :datetime,   index: true
    add_column :cancelled_conversations, :original_matched_at, :datetime,   index: true
  end
end
