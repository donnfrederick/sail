class CreateHobbies < ActiveRecord::Migration[5.2]
  def change
    create_table :hobbies do |t|
      t.string :scope,   index: true, limit: 191
      t.string :name_ja, limit: 191
      t.string :name_en, limit: 191

      t.timestamps
    end
  end

  def data
    resources = YAML.load_file(Rails.root.join('db/datasources/hobbies.yml'))
    resources.each do |resource|
      model = if resource.has_key? :id
                Hobby.where(id: resource[:id]).first_or_initialize
              else
                Hobby.where(resource).first_or_initialize
              end

      model.attributes = resource
      model.save!
    end
  end
end
