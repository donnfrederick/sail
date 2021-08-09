class CancelledConversation < ApplicationRecord
  belongs_to :conversation
  belongs_to :teacher
  belongs_to :student, optional: true

  before_validation :copy_original_attrs
  before_validation :set_default_values

  def users
    User.where(id: [self.teacher_id, self.student_id])
  end

  def zero_day?
    users
      .select {|u| zero_day_for?(u) }
      .count > 0
  end

  private

    def zero_day_for?(user)
      start_at = self.start_at.in_time_zone(user.timezone).beginning_of_day
      end_at = start_at.end_of_day
      needle = self.created_at.in_time_zone(user.timezone)
      start_at <= needle && needle <= end_at
    end

    def copy_original_attrs
      self.teacher = self.conversation.teacher
      self.student = self.conversation.student
      self.original_created_at = self.conversation.created_at
      self.original_matched_at = self.conversation.matched_at
      self.start_at = self.conversation.start_at
      self.end_at = self.conversation.end_at
    end

    def set_default_values
      self.reason ||= "admin"
    end
end
