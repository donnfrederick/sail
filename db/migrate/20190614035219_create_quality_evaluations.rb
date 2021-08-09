class CreateQualityEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :quality_evaluations do |t|
      t.references :evaluation, index: true
      t.integer :quality_id, default: 0
      t.timestamps
    end
    add_index :quality_evaluations, [:evaluation_id, :quality_id], unique: true
  end
end
