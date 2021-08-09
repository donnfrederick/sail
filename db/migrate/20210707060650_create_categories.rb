class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name_jp
      t.string :name_en
      t.string :name_indo
      t.string :name_vietnam
      t.string :name_china
      t.string :name_taiwan
      t.string :name_taly
      t.string :name_spain
      t.string :name_france
      t.integer :delete_flg
      t.string :color
    end
  end
end
