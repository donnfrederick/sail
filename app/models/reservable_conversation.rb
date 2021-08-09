# == Schema Information
#
# Table name: reservable_conversations
#
#  id              :bigint(8)        not null, primary key
#  user_id         :bigint(8)
#  conversation_id :bigint(8)
#  start_at        :datetime
#  end_at          :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  deleted_at      :datetime
#

class ReservableConversation < ApplicationRecord
  belongs_to :conversation
  belongs_to :user

  default_scope { includes(:conversation) }

  scope :start_at_by, ->(start_at) { where("? <= start_at", start_at) }
  scope :end_at_by, ->(end_at) { where("end_at <= ?", end_at) }

  scope :start_on_by, ->(start_on) {
    start_at_by(start_on.in_time_zone.beginning_of_day)
  }
  scope :end_on_by, ->(end_on) {
    end_at_by(end_on.in_time_zone.end_of_day)
  }

  scope :date_on, ->(date) {
    start_on_by(date).end_on_by(date)
  }

  scope :exactly, ->(teacher, start_at) { where(user_id: teacher.id, start_at: start_at) }

  scope :visible, -> { where(deleted_at: nil) }
  scope :expired, -> { where("start_at < ?", Time.zone.now) }

  def invisible
    update(deleted_at: Time.zone.now)
  end

  def invisible!
    update!(deleted_at: Time.zone.now)
  end

  def status
    conversation.try(:status)
  end

  def users
    conversation.try(:users)
  end

  def channel_id
    conversation.try(:channel_id)
  end

  def with_self
    conversation.try(:with_self) || false
  end

  def accepting_requests
    conversation.try(:accepting_requests) || false
  end

  def self.delete_all_expired
    ReservableConversation.expired.delete_all
  end

  def self.delete_all_closed
    Conversation.queued.map(&:reservable_conversations).map(&:delete_all)
  end
end
