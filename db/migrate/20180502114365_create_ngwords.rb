class CreateNgwords < ActiveRecord::Migration[5.2]
  def change
    create_table :ngwords do |t|
      t.string :word, index: true, limit: 191
      t.timestamps
    end
  end
end
