class ChangeEvaluateToBeFloatInUser < ActiveRecord::Migration[5.2]
  def up
    change_column :users, :evaluate, :float
  end

  def down
    change_column :users, :evaluate, :integer
  end
end
