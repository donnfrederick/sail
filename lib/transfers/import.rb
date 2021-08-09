# bin/rails runner "Transfers::Import.all"

class Transfers::Import
  IMPORT_DIR = Rails.root.join("db/datasources/").to_s

  def self.all
    [
      "admin_users.yml",
      "hobbies.yml",
      "purposes.yml",
      "notifications.yml",
      # "jp_locations.yml",
      # "jp_prefectures.yml",
      "users.yml",
      "conversations.yml",
      "organizations.yml",
      "organization_sections.yml",
      "organization_devices.yml",
      "organization_staffs.yml",
      "organization_sections_staffs.yml",
      "users_hobbies.yml",
      "users_conversations.yml",
      "users_organization_sections.yml",
    ].each do |file|
      pp file
      file_by(File.join(IMPORT_DIR, file))
    end
  end

  def self.file_by(filepath)
    model_name = filepath.split('/').last.gsub('.yml', '')
    klass = model_name.singularize.camelize.constantize

    resources = YAML.load_file(filepath)
    resources.each do |resource|
      if resource.has_key? :id
        model = klass.where(id: resource[:id]).first_or_initialize
      else
        model = klass.where(resource).first_or_initialize
      end

      model.attributes = resource

      unless model.save#(validate: false)
        pp resource
        pp model.errors.full_messages
      end
    end
  end

end
