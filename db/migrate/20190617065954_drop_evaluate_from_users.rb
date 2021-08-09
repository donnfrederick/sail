class DropEvaluateFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :evaluate
  end
end
