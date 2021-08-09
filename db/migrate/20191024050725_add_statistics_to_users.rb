class AddStatisticsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :statistics, :boolean, default: true
  end
end
