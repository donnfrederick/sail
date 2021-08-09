class ChangeConversationsOnIssues < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    Issue.available_without_expiration.update_all(conversations: 1)
  end
end
