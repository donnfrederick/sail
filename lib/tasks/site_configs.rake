namespace :site_configs do

  desc "site_configsをDBに反映する"
  task :update => :environment do
    import_dir = Rails.root.join("db/datasources/").to_s
    file = "site_configs.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                SiteConfig.where(id: resource[:id]).first_or_initialize
              elsif resource.has_key? :keyword
                SiteConfig.where(keyword: resource[:keyword]).first_or_initialize
              else
                SiteConfig.where(resource).first_or_initialize
              end

      model.attributes = resource
      model.save!
    end
  end

  desc "site_configsを参照する"
  task :get => :environment do
    SiteConfig.find_each do |config|
      puts "#{config.keyword} : #{config.content}"
    end
  end

end
