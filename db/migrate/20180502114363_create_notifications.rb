class CreateNotifications < ActiveRecord::Migration[5.2]
  def change
    create_table :notifications do |t|
      t.references :admin_user, index: true
      t.string   :title,    limit: 191
      t.text     :body
      t.string   :category, limit: 191
      t.string   :level,    limit: 191
      t.datetime :notificated_at
      t.timestamps
    end
  end
end
