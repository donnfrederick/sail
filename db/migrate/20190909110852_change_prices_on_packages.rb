class ChangePricesOnPackages < ActiveRecord::Migration[5.2]
  def change
    change_column :packages, :original_price, :string
    change_column :packages, :discounted_price, :string, default: "-1"
  end
end
