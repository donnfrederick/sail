class AddInvalidToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :invalid_as_foreigner, :boolean, default: false
    add_column :users, :invalid_as_ridiculous, :boolean, default: false
  end
end
