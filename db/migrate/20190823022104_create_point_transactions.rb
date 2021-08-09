class CreatePointTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :point_transactions do |t|
      t.references :issue, index: true
      t.references :conversation, index: true
      t.string :type, limit: 191, index: true
      t.integer :points

      t.datetime :deleted_at
      t.timestamps
    end
  end
end
