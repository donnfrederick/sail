class CreateConversationsReportReasons < ActiveRecord::Migration[5.2]
  def change
    create_table :conversations_report_reasons do |t|
      t.references :conversations_report, index: true
      t.integer :reason_id

      t.timestamps
    end
    add_index :conversations_report_reasons, [:conversations_report_id, :reason_id], unique: true, name: "conversations_report_reason_index"
  end
end
