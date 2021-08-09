class DropInvalidUsers < ActiveRecord::Migration[5.2]
  def change
    drop_table :invalid_users
  end
end
