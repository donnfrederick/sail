class CreateConversationsReports < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations_reports do |t|
      t.references :conversation, index: true
      t.references :from_user,    references: :user, index: true
      t.references :to_user,      references: :user, index: true
      t.string   :detail,              limit: 191
      t.boolean  :block_requested,     default: false

      t.timestamps
    end
  end
end
