class CreateReservableConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservable_conversations do |t|
      t.references :user,         index: true
      t.references :conversation, index: true
      t.datetime   :start_at,     index: true
      t.datetime   :end_at,       index: true

      t.timestamps
    end
  end
end
