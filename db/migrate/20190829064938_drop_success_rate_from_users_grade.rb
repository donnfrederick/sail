class DropSuccessRateFromUsersGrade < ActiveRecord::Migration[5.2]
  def change
    remove_column :users_grades, :succeeded
    remove_column :users_grades, :success_percentage
  end
end
