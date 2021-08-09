class AggregateDataToUserGrade < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    User.reset_column_information
    UsersGrade.reset_column_information

    import_dir = Rails.root.join("db/datasources/20190725234952/").to_s
    file = "users.yml".freeze
    resources = YAML.load_file(File.join(import_dir, file))
    resources.each do |resource|
      model = if resource.has_key? :id
                User.where(id: resource[:id]).first_or_initialize
              else
                User.where(resource).first_or_initialize
              end
      model.attributes = resource
      model.save!(validate: false)
    end

    UsersGrade.find_each do |users_grade|
      users_grade.aggregate
      users_grade.save!
    end
  end
end
