class AddBlockedToConversations < ActiveRecord::Migration[5.2]
  def change
    add_column :conversations, :teacher_blocks, :boolean, index: true, default: false
    add_column :conversations, :student_blocks, :boolean, index: true, default: false
  end
end
