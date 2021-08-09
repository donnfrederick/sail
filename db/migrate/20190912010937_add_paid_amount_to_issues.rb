class AddPaidAmountToIssues < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :paid_amount, :string, default: "0"
  end
end
