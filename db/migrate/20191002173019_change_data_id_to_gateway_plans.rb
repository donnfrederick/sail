class ChangeDataIdToGatewayPlans < ActiveRecord::Migration[5.2]
  def change
    change_column :gateway_plans, :data_id, :string, limit: 191, default: nil
  end
end
