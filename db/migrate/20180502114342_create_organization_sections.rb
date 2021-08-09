class CreateOrganizationSections < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_sections do |t|
      t.references :organization, index: true
      t.string   :name_ja, limit: 191
      t.string   :name_en, limit: 191
      t.boolean :tutoring, default: false
      t.boolean :statistics, default: true
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
