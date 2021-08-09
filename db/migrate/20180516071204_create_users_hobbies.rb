class CreateUsersHobbies < ActiveRecord::Migration[5.2]
  def change
    create_table :users_hobbies do |t|
      t.references :user,  index: true
      t.references :hobby, index: true

      t.timestamps
    end
  end
end
