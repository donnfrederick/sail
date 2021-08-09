class AddOrganizationStaffIdToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :organization_staff_id,  :integer, index: true
  end
end
