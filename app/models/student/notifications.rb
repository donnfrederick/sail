class Student < User
  def send_thanks_registration
    StudentMailer.thanks_registration(self).deliver_now
  end

  def self.send_follow_up_2nd_day
    # WARNING: 多重実行の防止がついていないので注意してください
    where("created_at > ?", Time.now - 2.days).where("created_at <= ?", Time.now - 1.days).find_each do |student|
      StudentMailer.follow_up_2nd_day(student).deliver_now
    end
  end
end
