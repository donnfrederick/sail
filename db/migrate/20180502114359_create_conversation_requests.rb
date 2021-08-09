class CreateConversationRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :conversation_requests do |t|
      t.references :to_user,   references: :user, index: true
      t.references :from_user, references: :user, index: true
      t.string     :status,    index: true, limit: 191

      t.timestamps
    end
  end
end
