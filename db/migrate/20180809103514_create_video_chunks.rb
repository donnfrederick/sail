class CreateVideoChunks < ActiveRecord::Migration[5.2]
  def change
    create_table :video_chunks do |t|
      t.references :conversation, index: true
      t.string   :file,       limit: 191
      t.string   :client_id,  limit: 191
      t.datetime :start_at
      t.datetime :end_at
      t.string   :type,       limit: 191
      t.timestamps
    end
  end
end
