ActiveAdmin.register Notification do
  menu priority: 10

  permit_params :scope, :notificated_at, :title_ja, :title_en, 
    :body_ja, :body_en, :admin_user_id, :user_id

  scope "All",          :overall, default: true
  scope "Teacher",      :teachers
  scope "Student",      :students
  scope "Organization", :organizations
  scope "Individual",   :individual

  index do
    selectable_column
    id_column
    column :scope
    column :title_ja
    column :title_en
    column :notificated_at do |c|
      c.notificated_at.to_s
    end
    actions
  end

  filter :notificated_at
  filter :title_ja
  filter :title_en
  filter :body_ja
  filter :body_en

  show do
    attributes_table do
      row :id
      row :scope_name
      row :title_ja
      row :title_en
      row :body_ja
      row :body_en
      row :notificated_at do |c|
        c.notificated_at.to_s
      end
      row :created_at
      row :updated_at
      row :admin_user do |c|
        c.admin_user.try(:email)
      end
      row :organization_staff do |c|
        c.organization_staff.try(:name)
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    f.object.notificated_at ||= Time.zone.now

    f.inputs 'Notification Details' do
      f.input :scope, collection: Notification::SELECT_SCOPES.invert,
                      include_blank: false
      f.input :title_ja
      f.input :title_en
      f.input :body_ja
      f.input :body_en
      f.input :notificated_at
      f.input :admin_user_id, as: :hidden,
                              input_html: { value: current_admin_user.id }
      f.input :import, as: :file
    end
    f.actions
  end

  controller do
    def create
      if params[:notification][:scope] == Notification::SCOPE_INDIVIDUAL && params[:notification][:import].present?
        revival(CSV.read(params[:notification][:import].path, headers: true)["id"])
        redirect_to admin_notifications_path(scope: Notification::SCOPE_INDIVIDUAL)
        return
      else
        super
      end
    end

    private
    def revival(ids)
      ids.each do |id|
        params[:notification][:user_id] = id
        Notification.create(permitted_params[:notification])
      end
    end
  end
end
