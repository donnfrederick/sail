# @deprecated
class Package < ApplicationRecord

  TYPE_INDIVIDUAL_STUDENT = "IndividualStudentPackage".freeze
  TYPE_ENTERPRISE_STUDENT = "EnterpriseStudentPackage".freeze
  TYPE_INDIVIDUAL_TEACHER = "IndividualTeacherPackage".freeze

  scope :coupon, -> { where("name LIKE 'coupon_%'") }
  scope :not_coupon, -> { where("name NOT LIKE 'coupon_%'") }
  scope :available, -> {
    where(expired_at: nil).
      or(where("expired_at > ?", Time.now))
  }
  scope :by_grade_name, -> (grade_name) {
    where("name LIKE '%_#{grade_name.downcase}'")
  }
  scope :available_for_user, -> (user) {
    available.by_grade_name(user.grade.name)
  }
  scope :for_sale, -> {
    where("original_price > 0")
  }
  scope :order_as_price, -> {
    order("LENGTH(discounted_price) ASC, discounted_price ASC")
  }

  def self.find_by_name(name)
    record = where(name: name).available.first
    raise ActiveRecord::RecordNotFound if record.nil?

    record
  end

  def conversations
    if self.original_conversations < 0 || self.bonus_conversations < 0
      self.original_conversations
    else
      self.original_conversations + self.original_conversations
    end
  end

  def price
    self.discounted_price.to_i < 0 ? self.original_price.to_f : self.discounted_price.to_f
  end

  def expires_at(since = nil)
    if self.expired_at.present?
      self.expired_at
    elsif self.duration > 0
      (since || Time.now + 1.weeks) + self.duration.months
    end
  end

  def grade_name
    self.name.split("_").pop
  end

  def available_for?(user)
    user.grade.name.downcase === grade_name
  end

  def self.find(_a)
    new
  end
end
