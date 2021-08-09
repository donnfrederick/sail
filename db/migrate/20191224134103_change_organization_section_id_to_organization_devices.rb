class ChangeOrganizationSectionIdToOrganizationDevices < ActiveRecord::Migration[5.2]
  def change
    OrganizationDevice.reset_column_information

    if OrganizationDevice.column_names.include? "organization_section_id"
      change_column :organization_devices, :organization_section_id, :bigint, default: 1
    end
  end
end
