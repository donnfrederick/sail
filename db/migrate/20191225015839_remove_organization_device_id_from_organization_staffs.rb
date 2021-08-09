class RemoveOrganizationDeviceIdFromOrganizationStaffs < ActiveRecord::Migration[5.2]
  def change
    OrganizationStaff.reset_column_information

    if OrganizationStaff.column_names.include? "organization_device_id"
      remove_column :organization_staffs, :organization_device_id
    end
  end
end
