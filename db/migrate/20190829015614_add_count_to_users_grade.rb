class AddCountToUsersGrade < ActiveRecord::Migration[5.2]
  def change
    rename_column :users_grades, :conversations, :conversation_count
    add_column :users_grades, :feedback_count, :integer, default: 0
    add_column :users_grades, :absence_count, :integer, default: 0
    add_column :users_grades, :lateness_count, :integer, default: 0
    add_column :users_grades, :negative_feedback_count, :integer, default: 0
    add_column :users_grades, :discommunication_count, :integer, default: 0
    add_column :users_grades, :no_video_count, :integer, default: 0
    add_column :users_grades, :noisy_place_count, :integer, default: 0
  end
end
