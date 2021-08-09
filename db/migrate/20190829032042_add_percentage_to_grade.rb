class AddPercentageToGrade < ActiveRecord::Migration[5.2]
  def change
    rename_column :grades, :minimum_conversations, :min_conversation_count
    remove_column :grades, :minimum_success_percentage
    add_column :grades, :max_absence_percentage, :integer, default: 0
    add_column :grades, :max_lateness_percentage, :integer, default: 0
    add_column :grades, :max_negative_feedback_percentage, :integer, default: 0
    add_column :grades, :max_discommunication_percentage, :integer, default: 0
    add_column :grades, :max_no_video_percentage, :integer, default: 0
    add_column :grades, :max_noisy_place_percentage, :integer, default: 0
  end
end
