class AmbushConversation < ApplicationRecord
  belongs_to :conversation, optional: true
  belongs_to :user

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

  scope :current, -> {
    where("start_at <= :now AND :now <= end_at", now: Time.zone.now)
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

    start_at_by(target_datetime.beginning_of_week(START_OF_WEEK)).
      end_at_by(target_datetime.end_of_week(START_OF_WEEK))
  }
  scope :monthly_by, ->(page = 1) {
    target_datetime = Time.zone.now + (page.to_i - 1).months

    start_at_by(target_datetime.beginning_of_month).
      end_at_by(target_datetime.end_of_month)
  }
  scope :during, ->(start_at, end_at) {
    where("? >= start_at", start_at).where("end_at >= ?", end_at)
  }

  scope :visible, -> { where(deleted_at: nil) }

  def invisible
    update(deleted_at: Time.zone.now)
  end

  def invisible!
    update!(deleted_at: Time.zone.now)
  end
end
