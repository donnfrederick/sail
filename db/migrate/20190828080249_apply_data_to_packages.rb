class ApplyDataToPackages < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    import_dir = Rails.root.join("db/datasources/20190828080249/").to_s
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
