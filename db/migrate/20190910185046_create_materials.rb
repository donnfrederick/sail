class CreateMaterials < ActiveRecord::Migration[5.2]
  def change
    create_table :materials do |t|
      t.references :admin_user, index: true
      t.string :name, limit: 191, null: false, unique: true
      t.text :url, null: false
      t.integer :views, default: 0

      t.timestamps
    end
  end

  def data
    Material.reset_column_information

    import_dir = Rails.root.join("db/datasources/20190910185046/").to_s
    file = "materials.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                Material.where(id: resource[:id]).first_or_initialize
              else
                Material.where(resource).first_or_initialize
              end

      model.attributes = resource
      model.save!
    end
  end
end
