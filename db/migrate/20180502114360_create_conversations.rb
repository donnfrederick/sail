class CreateConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations do |t|
      t.references :conversation_request, index: true
      t.references :admin_user, index: true
      t.string     :status,     index: true, null: false, limit: 191
      t.datetime   :start_at,   index: true
      t.datetime   :end_at,     index: true

      t.timestamps
    end
  end
end
