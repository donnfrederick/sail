# == Schema Information
#
# Table name: issues
#
#  id              :bigint           not null, primary key
#  conversations   :integer          default(0)
#  expired_at      :datetime
#  failure_code    :string(255)
#  failure_message :string(255)
#  paid_amount     :string(255)      default("0")
#  prerogative     :boolean          default(FALSE)
#  status          :string(255)
#  succeeded       :boolean
#  type            :string(191)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  data_id         :string(191)
#  user_id         :bigint
#
# Indexes
#
#  index_issues_on_data_id  (data_id)
#  index_issues_on_type     (type)
#  index_issues_on_user_id  (user_id)
#
class Issue < ApplicationRecord
  TYPE_FREE   = "FreeIssue".freeze
  TYPE_STRIPE = "StripeIssue".freeze
  TYPE_PAYPAL = "PayPalIssue".freeze
  TYPE_GOOGLEPLAY = "GoogleplayIssue".freeze
  TYPE_ORGANIZATION_SECTION = "OrganizationSectionIssue".freeze

  TYPE_NAMES = {
    TYPE_FREE   => "無料".freeze,
    TYPE_STRIPE => "Stripe".freeze,
    TYPE_PAYPAL => "PayPal".freeze,
    TYPE_GOOGLEPLAY => "GoogleplayIssue".freeze,
    TYPE_ORGANIZATION_SECTION => "組織として支払い".freeze,
  }

  STATUS_NORMAL = nil
  STATUS_SUSPENDED = "suspended".freeze
  STATUS_CANCELLED = "cancelled".freeze

  STATUSES = {
    STATUS_NORMAL => "通常".freeze,
    STATUS_SUSPENDED => "保留中".freeze,
    STATUS_CANCELLED => "キャンセル".freeze
  }

  belongs_to :user, optional: true
  has_many :coupons_issues

  scope :by_user_id, ->(user_id) { where(user_id: user_id) }
  scope :by_type, ->(type_string) { where(type: type_string) }
  scope :available, -> {
    normally_available.
      or(available_without_expiration).
      or(unlimited_with_expiration).
      or(unlimited_without_expiration)
  }

  scope :normally_available,             -> { where("conversations > 0").where("expired_at >= ?", Time.now) }
  scope :available_without_expiration,   -> { where("conversations > 0").where(expired_at: nil) }
  scope :unlimited_with_expiration,      -> { where("conversations < 0").where("expired_at >= ?", Time.now) }
  scope :unlimited_without_expiration,   -> { where("conversations < 0").where(expired_at: nil) }
  scope :subscription, -> { unlimited_with_expiration.where.not(paid_amount: 0) }

  scope :prerogative, ->(yes_or_no = true) { where(prerogative: yes_or_no) }

  scope :oldest, -> { order(created_at: :asc) }

  after_initialize  :default_values
  validate :suspendability
  validate :cancellability
  validate :free_must_be_0_paid
  before_create :close_previous_issues!, if: :paid?

  def free?
    self.type === TYPE_FREE
  end

  def paid?
    !self.free?
  end

  def consume(points = 1)
    if self.unlimited? || self.unavailable?
      Rails.logger.warn "unlimited or unavailable Issue##{self.id} was to be consumed"
      ActiveRecord::Rollback
    else
      update(conversations: self.conversations - points)
    end
  end

  def consume!(points = 1)
    if self.unlimited? || self.unavailable?
      Rails.logger.warn "unlimited or unavailable Issue##{self.id} was to be consumed"
      ActiveRecord::Rollback
    else
      update!(conversations: self.conversations - points)
    end
  end

  def retrieve(points = 1)
    if self.unlimited?
      Rails.logger.warn "unlimited Issue##{self.id} was to be retrieved"
      ActiveRecord::Rollback
    else
      update(conversations: self.conversations + points)
    end
  end

  def retrieve!(points = 1)
    if self.unlimited?
      Rails.logger.warn "unlimited Issue##{self.id} was to be retrieved"
      ActiveRecord::Rollback
    else
      update!(conversations: self.conversations + points)
    end
  end

  def unlimited?
    self.conversations < 0
  end

  def unavailable?
    self.conversations === 0 || self.suspended?
  end

  def price
    self.paid_amount.to_i
  end

  def subscription?
    price <= 0 && unlimited?
  end

  def expired!
    update!(expired_at: Time.now)
  end

  def expired?
    self.expired_at.present? && self.expired_at <= Time.now
  end

  def extend!(time_span)
    update!(expired_at: Time.now + time_span)
  end

  def suspended?
    self.status === STATUS_SUSPENDED
  end

  def suspend!
    update!(status: STATUS_SUSPENDED)
  end

  def cancel!
    # paypal userのgrace period (1.weeks)を減算して、更新
    update!(status: STATUS_CANCELLED, expired_at: self.expired_at - 1.weeks)
  end

  def cancelled?
    self.status === STATUS_CANCELLED
  end

  def renew!(expired_at: nil, extend: nil)
    if expired_at.present?
      update!(status: STATUS_NORMAL, expired_at: expired_at)
    elsif extend.present?
      update!(status: STATUS_NORMAL, expired_at: Time.now + extend)
    else
      update!(status: STATUS_NORMAL)
    end
  end

  private

    def default_values
      self.type ||= TYPE_FREE
    end

    def free_must_be_0_paid
      if self.free? && self.price > 0
        errors[:base] << I18n.t("errors.issue.wrong_type")
      end
    end

    def close_previous_issues!
      if self.id.nil?
        Issue.by_user_id(self.user_id).available.update_all(expired_at: Time.now)
      else
        Issue.by_user_id(self.user_id).available.where.not(id: self.id).update_all(expired_at: Time.now)
      end
    end

    def suspendability
      if expired? && suspended?
        errors[:base] << I18n.t("errors.issue.cannot_suspend")
      end
    end

    def cancellability
      if expired? && cancelled?
        errors[:base] << I18n.t("errors.issue.cannot_cancel")
      end
    end
end
