class AddPayTesterToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :pay_tester, :boolean, default: false
  end
end
