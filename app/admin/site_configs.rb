ActiveAdmin.register SiteConfig do
  menu parent: "GroupConfigs", priority: 99

  permit_params :admin_user_id, :keyword, :format, :content

  index do
    selectable_column
    id_column
    column :keyword
    column :format do |c|
      SiteConfig::FORMAT_NAMES[c.format]
    end
    column :content
    column :description
    actions
  end

  filter :keyword
  filter :format, as: :select, collection: SiteConfig::FORMAT_NAMES

  show do
    attributes_table do
      row :id
      row :admin_user do |c|
        c.admin_user.try(:email)
      end
      row :keyword
      row :format do |c|
        SiteConfig::FORMAT_NAMES[c.format]
      end
      row :content
      row :description
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    f.inputs 'Site Configuration Details' do
      f.input :keyword
      f.input :format, as: :select, collection: SiteConfig::FORMAT_NAMES.invert
      f.input :content
      f.input :description
      f.input :admin_user_id, as: :hidden,
                              input_html: { value: current_admin_user.id }
    end
    f.actions
  end
end
