class AddFollowUpToPairs < ActiveRecord::Migration[5.2]
  def change
    add_column :pairs, :follow_up, :boolean, default: false
  end
end
