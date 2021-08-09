class AddManyColumnsToConversations < ActiveRecord::Migration[5.2]
  def change
    add_reference :conversations, :teacher,    references: :user, index: true
    add_column :conversations, :teacher_rated, :boolean, index: true, default: false
    add_column :conversations, :teacher_evaluation_fun, :integer, index: true, default: nil
    add_column :conversations, :teacher_evaluation_ability, :integer, index: true, default: nil
    add_column :conversations, :teacher_evaluation_time, :integer, index: true, default: nil
    add_column :conversations, :teacher_evaluation_sum, :integer, index: true, default: nil
    add_column :conversations, :teacher_video_unstable, :boolean, default: false
    add_column :conversations, :teacher_video_invisible, :boolean, default: false
    add_column :conversations, :teacher_environment_loud, :boolean, default: false
    add_column :conversations, :teacher_sound_unstable, :boolean, default: false
    add_column :conversations, :teacher_memo, :string, default: nil
    add_column :conversations, :teacher_report, :string, default: nil
    add_column :conversations, :teacher_report_solicitation, :boolean, default: false
    add_column :conversations, :teacher_report_spam, :boolean, default: false
    add_column :conversations, :teacher_report_sexual, :boolean, default: false
    add_column :conversations, :teacher_report_criminal, :boolean, default: false
    add_column :conversations, :teacher_report_other, :boolean, default: false
    add_column :conversations, :teacher_online_status, :string, index: true, default: nil
    add_reference :conversations, :student,    references: :user, index: true
    add_column :conversations, :student_rated, :boolean, index: true, default: false
    add_column :conversations, :student_evaluation_fun, :integer, index: true, default: nil
    add_column :conversations, :student_evaluation_ability, :integer, index: true, default: nil
    add_column :conversations, :student_evaluation_time, :integer, index: true, default: nil
    add_column :conversations, :student_evaluation_sum, :integer, index: true, default: nil
    add_column :conversations, :student_video_unstable, :boolean, default: false
    add_column :conversations, :student_video_invisible, :boolean, default: false
    add_column :conversations, :student_environment_loud, :boolean, default: false
    add_column :conversations, :student_sound_unstable, :boolean, default: false
    add_column :conversations, :student_memo, :string, default: nil
    add_column :conversations, :student_report, :string, default: nil
    add_column :conversations, :student_report_solicitation, :boolean, default: false
    add_column :conversations, :student_report_spam, :boolean, default: false
    add_column :conversations, :student_report_sexual, :boolean, default: false
    add_column :conversations, :student_report_criminal, :boolean, default: false
    add_column :conversations, :student_report_other, :boolean, default: false
    add_column :conversations, :student_online_status, :string, index: true, default: nil
    add_column :conversations, :matched_at, :datetime, default: nil
    add_column :conversations, :result_status, :string, index: true, default: nil
    add_column :conversations, :deleted_at, :datetime, default: nil
  end
end
