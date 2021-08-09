class CreateOrganizationAgents < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_agents do |t|
      t.references :organization_staff,   index: true
      t.integer  :privilege,              default: 0
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
