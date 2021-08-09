class User

  # OPTIMIZE: 差分だけ集計できると非常にベターです。

  # 無断欠席数を集計する
  def self.aggregate_absence
    absent_teachers = Conversation.finished.only_teacher_absence.group(:teacher_id).count
    Teacher.where(id: absent_teachers.map {|d| d[0] }).find_each do |teacher|
      teacher.absence = absent_teachers[teacher.id]
      teacher.save!
    end

    absent_students = Conversation.finished.only_student_absence.group(:student_id).count
    Student.where(id: absent_students.map {|d| d[0] }).find_each do |student|
      student.absence = absent_students[student.id]
      student.save!
    end
  end

  # 遅刻数を集計する
  def self.aggregate_lateness
    late_teachers = Conversation.finished.only_teacher_late.group(:teacher_id).count
    Teacher.where(id: late_teachers.map {|d| d[0] }).find_each do |teacher|
      teacher.lateness = late_teachers[teacher.id]
      teacher.save!
    end

    late_students = Conversation.finished.only_student_late.group(:student_id).count
    Student.where(id: late_students.map {|d| d[0] }).find_each do |student|
      student.lateness = late_students[student.id]
      student.save!
    end
  end

  # ユーザー評価を集計する
  # 評価が段階ではなく種類のため、ユーザー評価の集計は「不満がある」をカウントし
  # 減算評価することにします。
  def self.aggregate_evaluation_score
    rated_teachers = Conversation.finished.only_rated_by_student.where(student_evaluation_fun: 5).group(:teacher_id).count
    Teacher.where(id: rated_teachers.map {|d| d[0] }).find_each do |teacher|
      teacher.evaluation_score = rated_teachers[teacher.id] * -1
      teacher.save!(validate: false)
    end

    rated_students = Conversation.finished.only_rated_by_teacher.where(student_evaluation_fun: 5).group(:student_id).count
    Student.where(id: rated_students.map {|d| d[0] }).find_each do |student|
      student.evaluation_score = rated_students[student.id] * -1
      student.save!(validate: false)
    end
  end

  # ユーザー評価を集計する 楽しかったかどうかのところ
  def self.aggregate_evaluation_funs
    keywords = [:evaluation_very_funny, :evaluation_lovely, :evaluation_amazing, :evaluation_fine, :evaluation_uncomfortable]

    0.upto(keywords.count - 1) do |i|
      keyword = keywords[i]
      rated_teachers = Conversation.finished.only_rated_by_student.where(student_evaluation_fun: i + 1).group(:teacher_id).count
      Teacher.where(id: rated_teachers.map {|d| d[0] }).find_each do |teacher|
        teacher[keyword] = rated_teachers[teacher.id]
        teacher.save!
      end

      rated_students = Conversation.finished.only_rated_by_teacher.where(teacher_evaluation_fun: i + 1).group(:student_id).count
      Student.where(id: rated_students.map {|d| d[0] }).find_each do |student|
        student[keyword] = rated_students[student.id]
        student.save!
      end
    end
  end

  # ユーザーの日本語レベルを集計する (現在はstudentsのみで集計)
  def self.aggregate_rated_conversation_levels
    rated_students = Conversation.finished.only_rated_by_teacher.group(:student_id).sum(:teacher_evaluation_ability)
    rated_counts = Conversation.finished.only_rated_by_teacher.group(:student_id).count
    Teacher.where(id: rated_students.map {|d| d[0] }).find_each do |student|
      count = rated_counts[student.id]
      total = rated_students[student.id]
      average = total / count.to_f

      # TODO baseという変数名は適切ではない
      base = average.to_i
      fraction = average - base.to_f
      student.rated_conversation_level = if average < 3 && fraction > 0
                                           [base - 1, 1].max
                                         else
                                           base
                                         end

      student.save!
    end
  end
end
