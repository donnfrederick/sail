class CreatePackages < ActiveRecord::Migration[5.2]
  def change
    create_table :packages do |t|
      t.string :type, limit: 191, index: true
      t.string :name, limit: 191, unique: true
      t.integer :original_price
      t.integer :discounted_price, default: -1
      t.string :currency
      t.integer :duration
      t.integer :original_conversations
      t.integer :bonus_conversations, default: -1
      t.boolean :recommended, default: false
      t.string :description
      t.datetime :expired_at

      t.timestamps
    end
  end

  def data
    import_dir = Rails.root.join("db/datasources/20190815050355/").to_s
    file = "packages.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                Package.where(id: resource[:id]).first_or_initialize
              else
                Package.where(resource).first_or_initialize
              end

      model.attributes = resource
      model.save!
    end
  end
end
