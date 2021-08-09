class RenameEvaluationsToUsers < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :evaluation_most_fun, :evaluation_very_funny
    rename_column :users, :evaluation_fun, :evaluation_lovely
    rename_column :users, :evaluation_less_fun, :evaluation_amazing
    rename_column :users, :evaluation_not_fun, :evaluation_uncomfortable

    add_column :users, :evaluation_fine, :integer, default: 0, after: :evaluation_amazing
  end
end
