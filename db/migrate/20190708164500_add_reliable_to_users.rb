class AddReliableToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :highly_reliable, :boolean, default: false
    add_column :users, :suspicious, :boolean, default: false
  end
end
