class CreateActiveAdminComments < ActiveRecord::Migration::Current
  def self.up
    create_table :active_admin_comments do |t|
      t.string :namespace, limit: 191
      t.text   :body
      # t.references :resource, polymorphic: true
      t.string :resource_type, limit: 191
      t.bigint :resource_id
      # t.references :author, polymorphic: true
      t.string :author_type, limit: 191
      t.bigint :author_id
      t.timestamps

      t.index [:author_type, :author_id]
      t.index [:resource_type, :resource_id]
      t.index [:namespace]
    end
  end

  def self.down
    drop_table :active_admin_comments
  end
end
