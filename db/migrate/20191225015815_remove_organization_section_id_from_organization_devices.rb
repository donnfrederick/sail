class RemoveOrganizationSectionIdFromOrganizationDevices < ActiveRecord::Migration[5.2]
  def change
    OrganizationDevice.reset_column_information

    if OrganizationDevice.column_names.include? "organization_section_id"
      remove_column :organization_devices, :organization_section_id
    end
  end
end
