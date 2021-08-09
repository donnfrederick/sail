# == Schema Information
#
# Table name: cancelled_conversations
#
#  id                  :bigint           not null, primary key
#  end_at              :datetime
#  original_created_at :datetime
#  original_matched_at :datetime
#  reason              :string(191)
#  start_at            :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  conversation_id     :integer
#  student_id          :bigint
#  teacher_id          :bigint
#
# Indexes
#
#  index_cancelled_conversations_on_end_at      (end_at)
#  index_cancelled_conversations_on_reason      (reason)
#  index_cancelled_conversations_on_start_at    (start_at)
#  index_cancelled_conversations_on_student_id  (student_id)
#  index_cancelled_conversations_on_teacher_id  (teacher_id)
#
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
