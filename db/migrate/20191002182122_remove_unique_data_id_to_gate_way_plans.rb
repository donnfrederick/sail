class RemoveUniqueDataIdToGateWayPlans < ActiveRecord::Migration[5.2]
  def change
    remove_index :gateway_plans, column: :data_id
  end
end
