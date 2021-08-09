class CreateUsersPurposes < ActiveRecord::Migration[5.2]
  def change
    create_table :users_purposes do |t|
      t.references :user,    index: true
      t.references :purpose, index: true

      t.timestamps
    end
  end
end
