class CreateUsersConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :users_conversations do |t|
      t.references :user, index: true
      t.references :conversation, index: true
      t.integer :evaluation, default: 0, null: false

      t.timestamps
    end
  end
end
