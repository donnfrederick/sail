class CreateEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :evaluations do |t|
      t.references :users_conversation, index: true
      t.integer  :fun,             default: 0
      t.integer  :ability,             default: 0
      t.integer  :time,             default: 0
      t.timestamps
    end
  end
end
