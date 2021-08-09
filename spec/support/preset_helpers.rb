module Requests
  module PresetHelpers
    def self.create_packages
      resources = YAML.load_file(Rails.root.join('db/datasources/20190828080249/packages.yml'))
      resources.each do |resource|
        model = if resource.has_key? :id
                  Package.where(id: resource[:id]).first_or_initialize
                else
                  Package.where(resource).first_or_initialize
                end

        model.attributes = resource
        model.save!
      end
      Package.all
    end

    def self.create_grades
      resources = YAML.load_file(Rails.root.join('db/datasources/20190829034543/grades.yml'))
      resources.each do |resource|
        model = if resource.has_key? :id
                  Grade.where(id: resource[:id]).first_or_initialize
                else
                  Grade.where(resource).first_or_initialize
                end

        model.attributes = resource
        model.save!
      end
      Grade.all
    end
  end
end
