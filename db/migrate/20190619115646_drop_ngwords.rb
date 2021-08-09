class DropNgwords < ActiveRecord::Migration[5.2]
  def change
    drop_table :ngwords
  end
end
