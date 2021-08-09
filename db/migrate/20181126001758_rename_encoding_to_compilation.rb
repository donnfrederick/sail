class RenameEncodingToCompilation < ActiveRecord::Migration[5.2]
  def change
    rename_column :conversations, :encoding_status, :compilation_status
  end
end
