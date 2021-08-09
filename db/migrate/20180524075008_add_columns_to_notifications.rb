class AddColumnsToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :user_id,  :integer, index: true
    add_column :notifications, :scope,    :string,  limit: 191, index: true
    add_column :notifications, :title_ja, :string,  limit: 191
    add_column :notifications, :title_en, :string,  limit: 191
    add_column :notifications, :body_ja,  :text
    add_column :notifications, :body_en,  :text

    remove_column :notifications, :title
    remove_column :notifications, :body
    remove_column :notifications, :category
    remove_column :notifications, :level
  end
end
