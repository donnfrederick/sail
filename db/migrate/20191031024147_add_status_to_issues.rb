class AddStatusToIssues < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :status, :string, default: nil, index: true
  end
end
