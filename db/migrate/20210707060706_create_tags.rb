class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :name_jp
      t.integer :category_id
      t.string :name_en
      t.string :name_indo
      t.string :name_vietnam
      t.string :name_china
      t.string :name_taiwan
      t.string :name_taly
      t.string :name_spain
      t.string :name_france
    end
  end
end
