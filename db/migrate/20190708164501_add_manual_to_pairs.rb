class AddManualToPairs < ActiveRecord::Migration[5.2]
  def change
    add_column :pairs, :manual, :boolean, default: true
  end
end
