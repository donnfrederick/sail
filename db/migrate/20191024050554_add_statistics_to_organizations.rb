class AddStatisticsToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :statistics, :boolean, default: true
  end
end
