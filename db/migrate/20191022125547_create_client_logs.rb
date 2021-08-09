class CreateClientLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :client_logs do |t|
      t.references :user, index: true
      t.string :slug, null: true, limit: 191, index: true
      t.text :data, null: false
      t.timestamps
    end
  end
end
