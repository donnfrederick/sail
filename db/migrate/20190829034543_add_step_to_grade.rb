class AddStepToGrade < ActiveRecord::Migration[5.2]
  def change
    add_column :grades, :step, :integer, default: 1, unique: true
  end

  def data
    import_dir = Rails.root.join("db/datasources/20190829034543/").to_s
    file = "grades.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                Grade.where(id: resource[:id]).first_or_initialize
              else
                Grade.where(resource).first_or_initialize
              end

      model.attributes = resource
      model.save!
    end
  end
end
