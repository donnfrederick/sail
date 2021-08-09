class CreateConversationPackage < ActiveRecord::Migration[5.2]
  def change
    create_table :conversation_packages do |t|
      t.string :name, default: nil
      t.references :member_property,    references: :package_property, index: true
      t.references :silver_property,      references: :package_property, index: true
      t.references :gold_property,    references: :package_property, index: true
      t.references :platinum_property,      references: :package_property, index: true
    end
  end
end
