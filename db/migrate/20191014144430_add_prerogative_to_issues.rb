class AddPrerogativeToIssues < ActiveRecord::Migration[5.2]
  def change
    add_column :issues, :prerogative, :boolean, default: false
  end
end
