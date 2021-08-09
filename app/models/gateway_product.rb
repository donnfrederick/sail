# == Schema Information
#
# Table name: gateway_products
#
#  id                  :bigint           not null, primary key
#  gateway             :string(191)      not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  data_id             :string(191)
#  package_property_id :bigint
#
# Indexes
#
#  index_gateway_products_on_gateway              (gateway)
#  index_gateway_products_on_package_property_id  (package_property_id)
#
class GatewayProduct < ApplicationRecord
  belongs_to :package_property

  GATEWAYS = [
    GATEWAY_FAKE = "fake".freeze,
    GATEWAY_STRIPE = "stripe".freeze,
    GATEWAY_PAYPAL = "paypal".freeze,
  ].freeze

  delegate :create!, :update!, :exists?, :destroy!, to: :connector, prefix: true

  scope :paypal, -> { where(gateway: GATEWAY_PAYPAL) }

  validates :gateway, inclusion: { in: GATEWAYS }
  before_validation :default_values
  before_create :connector_create!
  after_update :connector_update!

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

  private

    def default_values
      self.data_id ||= "X#{Time.now.to_s}"
    end

    def connector
      if self.fake?
        Gateway::PackageProductConnector.new(self)
      elsif self.stripe?
        Stripe::PackageProductConnector.new(self)
      elsif self.paypal?
        Paypal::PackageProductConnector.new(self)
      end
    end
end
