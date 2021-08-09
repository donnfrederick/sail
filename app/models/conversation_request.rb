class ConversationRequest < ApplicationRecord
  belongs_to :from_user, class_name: "User", foreign_key: "from_user_id"
  belongs_to :conversation
  has_one :consumed_point_transaction
  has_one :retrieved_point_transaction

  scope :by_user_id, ->(user_id) { where(from_user_id: user_id)  }
  scope :by_conversation_id, ->(conversation_id) { where(conversation_id: conversation_id) }

  scope :rejected, -> { where(rejected: true) }
  scope :only_not_rejected, -> { where(rejected: false) }
  scope :only_not_approved, -> { where(approved: false) }

  scope :available, -> { only_not_rejected.where("start_at >= ?", Time.now) }
  scope :pending_for, ->(user) {
    by_user_id(user.id).available.only_not_rejected.only_not_approved
  }

  scope :start_at_by, ->(start_at) { where("? <= start_at", start_at) }
  scope :end_at_by, ->(end_at) { where("end_at <= ?", end_at) }

  scope :start_on_by, ->(start_on) {
    start_at_by(start_on.in_time_zone.beginning_of_day)
  }
  scope :end_on_by, ->(end_on) {
    end_at_by(end_on.in_time_zone.end_of_day)
  }
  scope :weekly_by, ->(page = 1) {
    target_datetime = Time.zone.now + (page.to_i - 1).weeks

    start_at_by(target_datetime.beginning_of_week(Conversation::START_OF_WEEK)).
      end_at_by(target_datetime.end_of_week(Conversation::START_OF_WEEK))
  }
  scope :monthly_by, ->(page = 1) {
    target_datetime = Time.zone.now + (page.to_i - 1).months

    start_at_by(target_datetime.beginning_of_month).
      end_at_by(target_datetime.end_of_month)
  }

  scope :order_by_start_at, -> { order(start_at: :asc) }

  validate :should_be_in_range
  before_save     :set_end_at
  before_destroy  :create_retrieved_point_transaction!, unless: :rejected?
  after_create    :create_consumed_point_transaction!
  after_save      :refund_conversation_points!, if: :rejected_now?
  before_destroy  :notify_cancelled!

  def self.reject_all
    update_all(approved: false, rejected: true)
  end

  def approve
    update(approved: true, rejected: false)
  end

  def approve!
    update!(approved: true, rejected: false)
  end

  def reject
    update(approved: false, rejected: true)
  end

  def reject!
    update!(approved: false, rejected: true)
  end

  private

    def set_end_at
      self.end_at ||= self.start_at + Conversation::DURATION
    end

    def should_be_in_range
      return if self.id.present?

      errors[:base] << "start_atが範囲外です。" unless conversation.starts_between?(self.start_at)
    end

    def rejected_now?
      self.saved_change_to_rejected? && self.rejected?
    end

    def refund_conversation_points!
      return unless consumed_point_transaction.try(:available?)

      create_retrieved_point_transaction!
    end

    def notify_cancelled!
      Notification.notify_request_cancelled(self)
    end
end
