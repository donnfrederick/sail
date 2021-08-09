class CreateSiteConfigs < ActiveRecord::Migration[5.2]
  def change
    create_table :site_configs do |t|
      t.references :admin_user, index: true
      t.string :keyword, limit: 191, unique: true
      t.integer :format
      t.text :content
      t.text :description, default: nil

      t.timestamps
    end
  end

  # ElasticBeanstalk Configurationにはあまり多くの設定を記述できないため、SiteConfigに対応した設定値はDBに書き込みます
  # @see https://github.com/kayac/sail/issues/2135
  def data
    import_dir = Rails.root.join("db/datasources/").to_s
    file = "site_configs.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                SiteConfig.where(id: resource[:id]).first_or_initialize
              else
                SiteConfig.where(resource).first_or_initialize
              end

      model.attributes = resource
      model.save!
    end
  end
end
