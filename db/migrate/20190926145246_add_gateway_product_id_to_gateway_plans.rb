class AddGatewayProductIdToGatewayPlans < ActiveRecord::Migration[5.2]
  def change
    add_reference :gateway_plans, :gateway_product, foreign_key: true
  end
end
