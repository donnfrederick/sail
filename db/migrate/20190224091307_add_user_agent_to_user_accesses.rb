class AddUserAgentToUserAccesses < ActiveRecord::Migration[5.2]
  def up
    add_column :user_accesses, :user_agent, :string, null: true, limit: 191
  end

  def down
    remove_column :user_accesses, :user_agent
  end
end
