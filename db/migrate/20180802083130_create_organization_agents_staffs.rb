class CreateOrganizationAgentsStaffs < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_agents_staffs do |t|
      t.references :organization_agent,   index: true
      t.references :organization_staff,   index: true
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
