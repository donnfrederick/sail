class CreateBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :blocks do |t|
      t.references :from_user,    references: :user, index: true
      t.references :to_user,      references: :user, index: true

      t.timestamps
    end
  end
end
