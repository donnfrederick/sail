class Coupon < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  has_many :users_coupons
  has_many :subscribers, through: :users_coupons, source: :user
  has_one :coupons_pricing_table
  has_one :pricing_table, through: :coupons_pricing_table
  delegate :count, to: :subscribers, prefix: true

  before_create :generate_code, if: :code_nil?

  def generate_code_old_style(needle = nil, keyword = nil)
    needle = self.user.id if needle.nil?
    keyword = Time.now if keyword.nil?
    self.code = OpenSSL::HMAC.hexdigest("md5", "#{needle}", "#{keyword}")
  end

  def generate_code
    needle = rand(1..1000000)
    keyword = rand(1..1000000)
    self.code = OpenSSL::HMAC.hexdigest("md5", "#{needle}", "#{keyword}").slice(0, 8)
  end

  def self.find_by_code(code)
    find_by(code: code)
  end

  private

    def name_nil?
      self.name.nil? || self.name.empty?
    end

    def code_nil?
      self.code.nil? || self.code.empty?
    end
end
