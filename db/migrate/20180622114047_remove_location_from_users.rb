class RemoveLocationFromUsers < ActiveRecord::Migration[5.2]
  def up
    remove_column :users, :location
  end

  def down
    add_column :users, :location, :string
  end
end
