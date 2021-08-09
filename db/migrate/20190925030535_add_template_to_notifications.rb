class AddTemplateToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :template, :string, limit: 191, default: nil
  end
end
