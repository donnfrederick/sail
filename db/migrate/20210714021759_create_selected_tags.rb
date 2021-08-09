class CreateSelectedTags < ActiveRecord::Migration[5.2]
  def change
    create_table :selected_tags do |t|
      t.string :user_email
      t.integer :tag_id
      t.string :tag_name
      t.integer :delete_flg
    end
  end
end
