# == Schema Information
#
# Table name: stats
#
#  id         :bigint           not null, primary key
#  data       :text(65535)      not null
#  digest     :string(191)      not null
#  duration   :integer
#  name       :string(191)      not null
#  nth        :integer          not null
#  start_at   :datetime
#  term       :string(191)      not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_stats_on_digest        (digest)
#  index_stats_on_name          (name)
#  index_stats_on_name_and_nth  (name,nth) UNIQUE
#  index_stats_on_term          (term)
#
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
