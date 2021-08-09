class CreateGrades < ActiveRecord::Migration[5.2]
  def change
    create_table :grades do |t|
      t.string  :type, limit: 191, index: true
      t.integer :minimum_conversations, default: 0
      t.float   :minimum_success_percentage, default: 0.0

      t.timestamps
    end
  end
end
