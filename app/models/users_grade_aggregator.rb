class UsersGradeAggregator
  attr_reader :user

  def initialize(user)
    @user = user
  end

  def absence_count
    @absence_count ||= user.absence
  end

  def conversation_count
    @conversation_count ||= user.conversations.finished.count
  end

  def lateness_count
    @lateness_count ||= user.lateness
  end

  def noisy_place_count
    @noisy_place_count ||= user.conversations.select {|c| c.student_environment_loud? }.count
  end

  def negative_feedback_count
    @negative_feedback_count ||= user.conversations.select {|c| c.student_evaluation_fun === 5 }.count
  end

  def discommunication_count
    @discommunication_count ||= user.conversations.select {|c| c.student_evaluation_ability === 5 }.count
  end

  def feedback_count
    @feedback_count ||= if user.teacher?
                          user.conversations.select {|c| c.student_rated? }.count
                        else
                          user.conversations.select {|c| c.teacher_rated? }.count
                        end
  end

  def no_video_count
    @no_video_count ||= user.conversations.select {|c| c.student_video_invisible? }.count
  end
end
