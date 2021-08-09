class RemoveOrganizationIdFromOrganizationStaffs < ActiveRecord::Migration[5.2]
  def change
    OrganizationStaff.reset_column_information

    if OrganizationStaff.column_names.include? "organization_id"
      remove_column :organization_staffs, :organization_id
    end
  end
end
