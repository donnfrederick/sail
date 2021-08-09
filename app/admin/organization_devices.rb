ActiveAdmin.register OrganizationDevice do
  menu parent: I18n.t("activerecord.models.organization"), priority: 40

  # 追加は OrganizationStaff から行う
  actions :all, except: [:new, :create]

  permit_params :model_number,
                :organization_staff_id,
                :property_management_number, :checkout_at, :return_at,
                users_attributes: [:id, _destroy: :true]

  index do
    selectable_column
    id_column
    column :organization_section do |c|
      if c.organization_section
        raw link_to(
          c.organization_section.breadcrumb_name,
          admin_organization_section_path(c.organization_section)
        )
      end
    end
    column :model_number
    column :property_management_number
    column :checkout_at do |c|
      c.checkout_at.to_s
    end
    column :return_at do |c|
      c.return_at.to_s
    end
    column "ユーザー数", :users do |c|
      "#{c.users.count} 人"
    end

    actions
  end

  filter :organization_section, collection: proc { OrganizationSection.where(organization: Organization.nursing_houses) }
  filter :model_number
  filter :property_management_number
  filter :checkout_at
  filter :return_at

  show do
    attributes_table do
      row :id
      row :organization_section do |c|
        if c.organization_section
          raw link_to(
            c.organization_section.breadcrumb_name,
            admin_organization_section_path(c.organization_section)
          )
        end
      end
      row :organization_staff do |c|
        if c.organization_staff
          raw link_to(
            c.organization_staff.email,
            admin_organization_staff_path(c.organization_staff)
          )
        end
      end
      row :model_number
      row :property_management_number
      row :checkout_at do |c|
        c.checkout_at.to_s
      end
      row :return_at do |c|
        c.return_at.to_s
      end
      row "ユーザー数", :users do |c|
        "#{c.users.count} 人"
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    if f.object.new_record?
      f.object.checkout_at ||= 1.day.since.beginning_of_day
      f.object.return_at ||= 2.years.since.end_of_day
    end

    sections = OrganizationSection.all

    f.inputs "貸出端末" do
      # f.input :organization_section, as: :select, collection: sections.map{|x| [x.breadcrumb_name, x.id]}, input_html: { disabled: !f.object.new_record? }
      f.input :model_number
      f.input :property_management_number
      f.input :checkout_at
      f.input :return_at

      unless f.object.new_record?
        users = f.object.organization_section.users
      else
        organization_ids = Organization.nursing_houses.pluck(:id)
        users = Teacher.includes(:organizations).where(organizations: organization_ids)
      end

      staffs = f.object.organization_section.organization_staffs.map{|x| [x.email, x.id] }
      f.inputs "ログインアカウント（担当職員）" do
        f.input :organization_staff_id, as: :select, collection: staffs
      end

      f.inputs "利用ユーザー" do
        f.has_many :users, new_record: "ユーザーを追加する", heading: "ユーザー" do |user|
          user.input :id, as: :select, collection: users.map{|u| ["#{u.organizations.first.try(:name)} > #{u.name}", u.id] }
        end
      end

    end
    f.actions
  end
end
