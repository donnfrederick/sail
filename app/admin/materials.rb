ActiveAdmin.register Material do

  permit_params :admin_user_id, :name, :url

  index do
    selectable_column
    id_column
    column :name
    column :entry_point do |c|
      link_to c.entry_point, c.entry_point
    end
    column :url
    column :views
    actions
  end

  filter :name
  filter :url

  show do
    attributes_table do
      row :id
      row :admin_user do |c|
        c.admin_user.try(:email)
      end
      row :name
      row :entry_point do |c|
        link_to c.entry_point, c.entry_point
      end
      row :url
      row :views
      row :created_at do |c|
        c.created_at.to_s
      end
      row :updated_at do |c|
        c.updated_at.to_s
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    f.inputs 'Material URL Details' do
      f.input :name
      f.input :url
      f.input :admin_user_id, as: :hidden,
                              input_html: { value: current_admin_user.id }
    end
    f.actions
  end
end
