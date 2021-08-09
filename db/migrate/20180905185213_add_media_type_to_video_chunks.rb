class AddMediaTypeToVideoChunks < ActiveRecord::Migration[5.2]
  def change
    add_column :video_chunks, :media_type, :string, limit: 191
  end
end
