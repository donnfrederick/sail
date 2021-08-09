class GatewayPlan < ApplicationRecord
  belongs_to :package_property
  belongs_to :gateway_product

  GATEWAYS = [
    GATEWAY_FAKE = "fake".freeze,
    GATEWAY_STRIPE = "stripe".freeze,
    GATEWAY_PAYPAL = "paypal".freeze,
  ].freeze

  delegate :create!, :update!, :retrieve!, :name, :description, to: :connector, prefix: true

  scope :stripe, -> { where(gateway: GATEWAY_STRIPE) }
  scope :paypal, -> { where(gateway: GATEWAY_PAYPAL) }

  validates :gateway, inclusion: { in: GATEWAYS }
  before_validation :default_values
  before_create :connector_create!

  def self.available_gateways
    if Rails.env.test?
      [GATEWAY_FAKE]
    else
      GATEWAYS.reject {|g| g == GATEWAY_FAKE }
    end
  end

  def fake?
    self.gateway === GATEWAY_FAKE
  end

  def stripe?
    self.gateway === GATEWAY_STRIPE
  end

  def paypal?
    self.gateway === GATEWAY_PAYPAL
  end

  def name
    connector_name
  end

  def description
    connector_description
  end

  def retrieve!
    connector_retrieve!
  end

  def update_status!(status)
    if self.paypal?
      connector_update!(state: status)
    end
  end

  def status
    retrieve!.try(:state) || "INACTIVE"
  end

  private

    def default_values
      self.data_id ||= "X#{Time.now.to_s}"
    end

    def connector
      if self.fake?
        Gateway::PackagePlanConnector.new(self)
      elsif self.stripe?
        Stripe::PackagePlanConnector.new(self)
      elsif self.paypal?
        Paypal::PackagePlanConnector.new(self)
      end
    end
end
