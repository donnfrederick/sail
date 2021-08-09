class PackageProperty < ApplicationRecord
  acts_as_paranoid

  INTERVALS = [
    INTERVAL_WEEKLY = "week".freeze,
    INTERVAL_MONTHLY = "month".freeze,
    INTERVAL_ANNUALLY = "year".freeze,
  ]

  has_many :gateway_products
  has_many :gateway_plans

  validate :should_be_available_currency

  after_create :create_gateway_products
  after_create :create_gateway_plans

  scope :subscriptions, -> { where("original_conversations < 0").where("duration > 0") }
  scope :available,     -> { where.not(discounted_price: "-1") }
  scope :unavailable,   -> { where(discounted_price: "-1") }

  def self.available_currencies
    SiteConfig.find_by_keyword("payment.package.currencies", "usd").
      split(",").
      map(&:strip).
      select {|v| v.present? }
  end

  def weekly?
    self.term === INTERVAL_WEEKLY
  end

  def monthly?
    self.term === INTERVAL_MONTHLY
  end

  def annually?
    self.term === INTERVAL_ANNUALLY
  end

  def conversations
    if self.original_conversations < 0 || self.bonus_conversations < 0
      self.original_conversations
    else
      self.original_conversations + self.bonus_conversations
    end
  end

  def price
    self.discounted_price.to_i < 0 ? self.original_price.to_f : self.discounted_price.to_f
  end

  def description
    "For #{self.conversations} conversation#{self.conversations > 1 ? "s": ""}"
  end

  def expires_at(since = nil)
    if self.expired_at.present?
      self.expired_at
    elsif self.duration > 0
      if weekly?
        (since || Time.now) + self.duration.weeks
      elsif monthly?
        # (since || Time.now) + self.duration.months
        # 1.weeks is a grace period for paypal user
        (since || Time.now + 1.weeks) + self.duration.months
      else
        (since || Time.now) + self.duration.years
      end
    end
  end

  def grade_name
    self.name.split("_").pop
  end

  def eql?(package_property)
    if package_property.is_a?(PackageProperty)
      package_property.id === self.id
    elsif package_property.is_a?(Hash)
      package_property[:id].present? && package_property[:id] === self.id
    else
      false
    end
  end

  def available_for?(user)
    user.grade.name.downcase === grade_name
  end

  def unavailable?
    self.discounted_price.to_i < 0
  end

  def unavailable!
    update!(discounted_price: "-1")
  end

  def free?
    price <= 0 && !unavailable?
  end

  def paid?
    price > 0
  end

  def package?
    self.original_conversations >= 0
  end

  def subscription?
    self.original_conversations < 0 && self.duration > 0
  end

  def subscription!(duration: nil, term: nil)
    args = {original_conversations: -1, duration: duration, term: term}.select {|_, v| v.present? }
    update!(args)
  end

  # @deprecated
  def interval
    self.term
  end

  # @deprecated
  def interval_count
    if self.duration < 0 # unlimited
      1
    else
      self.duration
    end
  end

  def stripe_data_id
    self.gateway_plans.stripe.first.data_id
  end

  private

    def should_be_available_currency
      unless PackageProperty.available_currencies.include? self.currency
        errors[:base] << I18n.t("errors.package_property.unavailable_currency")
      end
    end

    def create_gateway_products
      GatewayProduct.available_gateways.each do |gateway|
        gateway_products.build do |gp|
          gp.gateway = gateway
          gp.save!
          sleep 5 unless gp.fake? || gp.data_id.nil? || gp.data_id[0] === "X"
        end
      end
    end

    def create_gateway_plans
      gateway_products.each do |gateway_product|
        gateway_plans.build do |gp|
          gp.gateway_product = gateway_product
          gp.gateway = gateway_product.gateway
          gp.save!
          sleep 5 unless gp.fake? || gp.data_id.nil? || gp.data_id[0] === "X"
        end
      end
    end
end
