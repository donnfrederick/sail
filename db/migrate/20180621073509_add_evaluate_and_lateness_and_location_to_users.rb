class AddEvaluateAndLatenessAndLocationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :evaluate, :integer, default: 3, null: false
    add_column :users, :lateness, :integer, default: 0, null: false
    add_column :users, :location, :string
  end
end
