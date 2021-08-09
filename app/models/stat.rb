class Stat < ApplicationRecord
  TERMS = [
    TERM_DAILY = "daily".freeze,
    TERM_WEEKLY = "weekly".freeze,
    TERM_MONTHLY = "monthly".freeze,
  ]

  validates :term, presence: true,
            inclusion: { in: TERMS }

  validates :duration, presence: true,
            :numericality => { :greater_than_or_equal_to => 1, :less_than_or_equal_to => 30 }

  def self.build_digest(data)
    OpenSSL::HMAC.hexdigest("md5", self.name, data)
  end

  def end_at
    case self.term
    when TERM_DAILY
      self.start_at + self.duration.days - 1.seconds
    when TERM_WEEKLY
      self.start_at + self.duration.weeks - 1.seconds
    when TERM_MONTHLY
      self.start_at + self.duration.months - 1.seconds
    else
      raise ActiveRecord::RecordInvalid.new "#{self.term} is not valid"
    end
  end
end
