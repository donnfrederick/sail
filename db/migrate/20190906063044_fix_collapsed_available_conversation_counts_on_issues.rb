class FixCollapsedAvailableConversationCountsOnIssues < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    # 下記以外の意図しない無期限無料ユーザーのデータを修正
    good_supporter_student_ids = [2317, 2803, 3413, 2985, 1252, 3351, 2869, 3230, 3386, 3463, 3405, 2766, 2739, 1159, 1277, 2770, 2756]
    Student.where.not(id: good_supporter_student_ids).find_each do |student|
      student.available_issues.unlimited_without_expiration.update_all(conversations: 0)
    end
  end
end
