class CreateUserAccesses < ActiveRecord::Migration[5.2]
  def change
    create_table :user_accesses do |t|
      t.references :user, null: false, index: true
      t.string :fullpath,  limit: 191
      t.timestamps
    end
  end
end
