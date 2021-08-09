class AddDeletedAtToNotifications < ActiveRecord::Migration[5.2]
  def change
    # TODO paranoidをgemで入れたほうがベター
    add_column :notifications, :deleted_at, :datetime, index: true
  end
end
