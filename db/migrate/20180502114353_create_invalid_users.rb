class CreateInvalidUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :invalid_users do |t|
      t.references :user, index: true
      t.references :admin_user, index: true
      t.string :reason, limit: 191
      t.text   :comment
      t.timestamps
    end
  end
end
