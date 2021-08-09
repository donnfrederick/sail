class CreateOrganizations < ActiveRecord::Migration[5.2]
  def change
    create_table :organizations do |t|
      t.string   :industry,      null: false, limit: 191
      t.string   :country,       limit: 191
      t.string   :name_ja,       limit: 191
      t.string   :name_en,       limit: 191
      t.string   :name_kana,     limit: 191
      t.string   :local_address, limit: 191
      t.string   :phone_number,  limit: 191
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
