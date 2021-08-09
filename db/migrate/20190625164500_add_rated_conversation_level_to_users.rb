class AddRatedConversationLevelToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :evaluation_most_fun, :integer, default: 0
    add_column :users, :evaluation_fun, :integer, default: 0
    add_column :users, :evaluation_less_fun, :integer, default: 0
    add_column :users, :evaluation_not_fun, :integer, default: 0
    add_column :users, :evaluation_score, :float, default: 0.0
    add_column :users, :absence, :integer, default: 0
    add_column :users, :rated_conversation_level, :integer, default: 0
  end
end
