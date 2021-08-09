class ChangeUserAgentToText < ActiveRecord::Migration[5.2]
  def up
    change_column :user_accesses, :user_agent, :text, null: true
  end

  def down
    # NOTE: this might causes "too long" error at some records
    change_column :user_accesses, :user_agent, :string, null: true, limit: 191
  end
end
