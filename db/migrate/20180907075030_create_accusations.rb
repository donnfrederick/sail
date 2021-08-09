class CreateAccusations < ActiveRecord::Migration[5.2]
  def change
    create_table :accusations do |t|
      t.references :conversation, index: true
      t.references :from_user,    references: :user, index: true
      t.references :to_user,      references: :user, index: true
      t.references :accusation_reason

      t.timestamps
    end
  end
end
