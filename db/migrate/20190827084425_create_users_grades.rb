class CreateUsersGrades < ActiveRecord::Migration[5.2]
  def change
    create_table :users_grades do |t|
      t.references :user, unique: true
      t.references :grade, index: true
      t.boolean :succeeded
      t.integer :conversations, default: 0
      t.integer :success_percentage, default: 0
      t.datetime :assigned_at
      t.datetime :aggregated_at
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
