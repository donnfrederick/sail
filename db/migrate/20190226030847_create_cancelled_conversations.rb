class CreateCancelledConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :cancelled_conversations do |t|
      t.integer  :conversation_id, unique: true
      t.references :teacher, index: true, null: true, foreign_key: { to_table: :users }
      t.references :student, index: true, null: true, foreign_key: { to_table: :users }
      t.string     :reason,  index: true, limit: 191
      t.datetime   :start_at,     index: true
      t.datetime   :end_at,       index: true
      t.timestamps
    end
  end
end
