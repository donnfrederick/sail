ActiveAdmin.register AdminUser do
  menu parent: "GroupConfigs", priority: 98

  permit_params :email, :role

  index do
    selectable_column
    id_column
    column :email
    column :role
    column :last_sign_in_ip
    column :last_sign_in_at do |c|
      c.last_sign_in_at.to_s
    end
    actions
  end

  filter :email
  filter :role

  show do
    attributes_table do
      row :id
      row :email
      row :role do |r|
        r.role_name
      end
      row :last_sign_in_ip
      row :last_sign_in_at do |c|
      c.last_sign_in_at.to_s
    end
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

    f.inputs 'Admin Details' do
      f.input :email
      f.input :role, collection: AdminUser::ROLES.invert
    end
    f.actions
  end
end
