class CreateConversationsMemos < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations_memos do |t|
      t.references :users_conversation, index: true
      t.string :memo

      t.timestamps
    end
  end
end
