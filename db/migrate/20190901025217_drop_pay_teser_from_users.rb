class DropPayTeserFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :pay_tester
  end
end
