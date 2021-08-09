class CreateConnectionStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :connection_statuses do |t|
      t.references :conversation
      t.string :client_id, null: false
      t.integer :minutes, default: 0
      t.string :media, null: false
      t.datetime :requested_at, null: false

      t.timestamps
    end
  end
end
