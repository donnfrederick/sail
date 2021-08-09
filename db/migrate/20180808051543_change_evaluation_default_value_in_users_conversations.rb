class ChangeEvaluationDefaultValueInUsersConversations < ActiveRecord::Migration[5.2]
  def up
    change_column :users_conversations, :evaluation, :integer, default: 3, null: false
  end

  def down
    change_column :users_conversations, :evaluation, :integer, default: 0, null: false
  end
end
