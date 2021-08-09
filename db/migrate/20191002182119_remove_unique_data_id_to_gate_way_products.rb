class RemoveUniqueDataIdToGateWayProducts < ActiveRecord::Migration[5.2]
  def change
    remove_index :gateway_products, column: :data_id
  end
end
