class DropTypeFromVideoChunks < ActiveRecord::Migration[5.2]
  def change
    remove_column :video_chunks, :type
  end
end
