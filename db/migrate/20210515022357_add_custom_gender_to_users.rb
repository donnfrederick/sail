class AddCustomGenderToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :custom_gender, :string
  end
end
