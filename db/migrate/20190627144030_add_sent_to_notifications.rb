class AddSentToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :sent, :boolean, default: false
  end
end
