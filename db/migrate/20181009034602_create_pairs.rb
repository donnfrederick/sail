class CreatePairs < ActiveRecord::Migration[5.2]
  def change
    create_table :pairs do |t|
      t.references :from_user,    references: :user, index: true
      t.references :to_user,      references: :user, index: true

      t.timestamps
    end
  end
end
