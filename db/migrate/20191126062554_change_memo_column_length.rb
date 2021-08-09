class ChangeMemoColumnLength < ActiveRecord::Migration[5.2]
  def change
    change_column :conversations, :teacher_memo, :text, default: nil, limit: 1024
    change_column :conversations, :student_memo, :text, default: nil, limit: 1024
  end
end
