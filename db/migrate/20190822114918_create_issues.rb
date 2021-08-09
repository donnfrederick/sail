class CreateIssues < ActiveRecord::Migration[5.2]
  def change
    create_table :issues do |t|
      t.references :user, index: true
      t.string :type, limit: 191, index: true
      t.string :failure_code
      t.string :failure_message
      t.boolean :succeeded
      t.string :data_id, limit: 191, index: true
      t.integer :conversations, default: 0
      t.datetime :expired_at

      t.timestamps
    end
  end
end
