class DropEvaluationFromUsersConversations < ActiveRecord::Migration[5.2]
  def change
    remove_column :users_conversations, :evaluation
  end
end
