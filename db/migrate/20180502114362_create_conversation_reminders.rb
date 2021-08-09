class CreateConversationReminders < ActiveRecord::Migration[5.2]
  def change
    create_table :conversation_reminders do |t|
      t.references :conversation, index: true
      t.boolean :next_day
      t.boolean :next_day_teacher
      t.boolean :next_day_staff
      t.boolean :coming_soon
      t.boolean :coming_soon_teacher
      t.boolean :coming_soon_staff
      t.boolean :coming_soon_30min
      t.boolean :coming_soon_30min_teacher
      t.boolean :coming_soon_30min_staff
      t.boolean :coming_soon_2hour
      t.boolean :coming_soon_2hour_teacher
      t.boolean :coming_soon_2hour_staff
      t.timestamps
    end
  end
end
