class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.string  :term, limit: 191
      t.date    :recorded_on
      t.string  :kind, limit: 191
      t.integer :count
      t.timestamps
    end
  end
end
