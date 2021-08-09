class CreateUsersOrganizationSections < ActiveRecord::Migration[5.2]
  def change
    create_table :users_organization_sections do |t|
      t.references :user, index: true
      t.references :organization_section, index: true

      t.timestamps
    end
  end
end
