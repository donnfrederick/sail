class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.references :from_user,    references: :user, index: true
      t.references :to_user,      references: :user, index: true

      t.timestamps
    end
    add_index :favorites, [:from_user_id, :to_user_id], unique: true, name: "favorite_unique_index"
  end
end
