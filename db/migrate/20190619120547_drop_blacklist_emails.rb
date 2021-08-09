class DropBlacklistEmails < ActiveRecord::Migration[5.2]
  def change
    drop_table :blacklist_emails
  end
end
