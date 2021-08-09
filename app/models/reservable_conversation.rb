# == Schema Information
#
# Table name: reservable_conversations
#
#  id              :bigint           not null, primary key
#  deleted_at      :datetime
#  end_at          :datetime
#  start_at        :datetime
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  conversation_id :bigint
#  user_id         :bigint
#
# Indexes
#
#  index_reservable_conversations_on_conversation_id  (conversation_id)
#  index_reservable_conversations_on_end_at           (end_at)
#  index_reservable_conversations_on_start_at         (start_at)
#  index_reservable_conversations_on_user_id          (user_id)
#

class ReservableConversation < ApplicationRecord
  belongs_to :conversation
  belongs_to :user

  #default_scopeを2日前以降のレコードのみにする
  default_scope { includes(:conversation).where("conversations.start_at > CONCAT(CAST(DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), '%Y-%m-%d') AS CHAR), '00:00:00')").references(:conversation) }

  scope :start_at_by, ->(start_at) { where("? <= reservable_conversations.start_at", start_at) }
  scope :end_at_by, ->(end_at) { where("reservable_conversations.end_at <= ?", end_at) }

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
  scope :expired, -> { where("reservable_conversations.start_at < ?", Time.zone.now) }

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
