class AddPictureToOrganizations < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :picture, :string, limit: 191
  end
end
