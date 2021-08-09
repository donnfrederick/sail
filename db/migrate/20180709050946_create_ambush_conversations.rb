class CreateAmbushConversations < ActiveRecord::Migration[5.2]
  def change
    create_table :ambush_conversations do |t|
      t.references :user,         index: true # studentのみ
      t.references :conversation, index: true # マッチした場合のみ
      t.datetime   :start_at,     index: true
      t.datetime   :end_at,       index: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
