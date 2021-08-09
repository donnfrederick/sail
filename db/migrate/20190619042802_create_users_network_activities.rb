class CreateUsersNetworkActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :users_network_activities do |t|
      t.references :user, index: true
      t.string :type,       limit: 191, index: true

      t.timestamps
    end
  end
end
