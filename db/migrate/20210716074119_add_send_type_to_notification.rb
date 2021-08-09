class AddSendTypeToNotification < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :send_type, :integer, default: 0
  end
end
