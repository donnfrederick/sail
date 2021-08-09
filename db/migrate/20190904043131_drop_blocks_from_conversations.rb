class DropBlocksFromConversations < ActiveRecord::Migration[5.2]
  def change
    remove_column :conversations, :teacher_blocks
    remove_column :conversations, :student_blocks
  end
end
