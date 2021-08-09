class CreateInvitations < ActiveRecord::Migration[5.2]
  def change
    create_table :invitations do |t|
      t.references :organization_section, index: true
      t.references :organization_staff,   index: true
      t.string   :token,       limit: 191
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
