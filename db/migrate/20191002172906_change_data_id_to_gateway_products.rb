class ChangeDataIdToGatewayProducts < ActiveRecord::Migration[5.2]
  def change
    change_column :gateway_products, :data_id, :string, limit: 191, default: nil
  end
end
