ActiveAdmin.register UserAccess do

  menu false

  actions :all, except: [:create, :update, :destroy]

  index do
    selectable_column
    id_column
    column :user do |c|
      if c.user.nil?
        nil
      elsif c.user.teacher?
        link_to c.user_name, admin_teacher_path(c.user)
      elsif c.user.student?
        link_to c.user_name, admin_student_path(c.user)
      end
    end
    column :fullpath
    column :created_at do |c|
      c.created_at.to_s
    end
    actions
  end

  filter :user, as: :select, collection: User.all.map {|t| [t.id, "#{t.id}: #{t.name_en}"]}.to_h.invert
  filter :created_at

  show do
    attributes_table do
      row :id
      row :user do |c|
        if c.user.nil?
          nil
        elsif c.user.teacher?
          link_to c.user_name, admin_teacher_path(c.user)
        elsif c.user.student?
          link_to c.user_name, admin_student_path(c.user)
        end
      end
      row :fullpath
      row :user_agent
      row :created_at do |c|
        c.created_at.to_s
      end
    end
  end
end
