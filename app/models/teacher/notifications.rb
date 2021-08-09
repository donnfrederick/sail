class Teacher < User
  def send_thanks_registration
    TeacherMailer.thanks_registration(self).deliver_now
  end

  def self.send_follow_up_2nd_day
    # WARNING: 多重実行の防止がついていないので注意してください
    where("created_at > ?", Time.now - 2.days).where("created_at <= ?", Time.now - 1.days).find_each do |teacher|
      TeacherMailer.follow_up_2nd_day(teacher).deliver_now
    end
  end

  def self.send_highlighted_users
    # TODO: 今は固定だが本来使うときは動的に
    students = Student.where(id: [2667, 4724, 3386, 2374, 4114]).all
    Teacher.find_each do |teacher|
      TeacherMailer.highlighted_users(teacher, students).deliver_now
    end
  end

  def send_highlighted_users
    students = Student.where(id: [2667, 4724, 3386, 2374, 4114]).all
    TeacherMailer.highlighted_users(self, students).deliver_now
  end
end
