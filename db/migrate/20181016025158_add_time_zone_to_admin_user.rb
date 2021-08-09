class AddTimeZoneToAdminUser < ActiveRecord::Migration[5.2]
  def change
    add_column :admin_users, :lang,     :string, default: "ja", limit: 3
    add_column :admin_users, :timezone, :string, default: "Asia/Tokyo", limit: 191
  end

  def data
    AdminUser.reset_column_information

    import_dir = Rails.root.join("db/datasources/20181016025158/").to_s
    file = "admin_users.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                AdminUser.where(id: resource[:id]).first_or_initialize
              else
                AdminUser.where(resource).first_or_initialize
              end

      model.attributes = resource
      model.save!
    end
  end
end
