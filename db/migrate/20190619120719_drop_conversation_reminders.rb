class DropConversationReminders < ActiveRecord::Migration[5.2]
  def change
    drop_table :conversation_reminders
  end
end
