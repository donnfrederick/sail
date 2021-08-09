ActiveAdmin.register OrganizationStaff do
  menu parent: I18n.t("activerecord.models.organization"), priority: 30

  # 追加は Organization から行う
  actions :all, except: [:new, :create]

  permit_params :organization_section_id,
                :official_position, :email, :phone_number,
                organization_device_attributes: [
                    :id, :organization_staff_id, :model_number,
                    :property_management_number, :checkout_at, :return_at, _destroy: :true,
                ]

  scope "Nursery houses", :nursing_houses, default: true
  scope "Universities",   :universities

  index do
    selectable_column
    id_column
    column :organization_section do |c|
      if c.organization_section
        raw link_to(c.organization_section.breadcrumb_name, admin_organization_section_path(c.organization_section))
      end
    end
    column :organization_device do |c|
      if c.organization_device
        raw link_to(c.organization_device.breadcrumb_name, admin_organization_device_path(c.organization_device))
      end
    end
    column :official_position
    column :phone_number
    column :email

    actions
  end

  filter :organization_section, collection: proc { OrganizationSection.includes(:organization).map{|x| [x.breadcrumb_name, x.id] } }
  filter :organization_device, collection: proc { OrganizationDevice.includes(organization_staff: { organization_section: :organization }).map{|x| [x.breadcrumb_name, x.id] } }
  filter :email
  filter :phone_number

  show title: proc {|c| c.email } do
    attributes_table do
      row :id
      row :organization_section do |c|
      if c.organization_section
        raw link_to(c.organization_section.breadcrumb_name, admin_organization_section_path(c.organization_section))
      end
      end
      row :organization_device do |c|
        if c.organization_device
          raw link_to(c.organization_device.breadcrumb_name, admin_organization_device_path(c.organization_device))
        end
      end
      row :official_position
      row :phone_number
      row :email
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

    f.inputs "担当職員" do
      f.input :organization_section, collection: OrganizationSection.includes(:organization).map{|x| [x.breadcrumb_name, x.id] },
                                     input_html: { disabled: !f.object.new_record? }
      f.input :official_position
      f.input :phone_number
      f.input :email
      f.input :password
    end

    f.inputs "貸出端末", for: [:organization_device, f.object.organization_device || OrganizationDevice.new] do |device|
      device.input :model_number
      device.input :property_management_number
      device.input :checkout_at
      device.input :return_at
    end
    f.actions
  end

  member_action :org_signin, method: :post do
    path = case resource.organization.try(:industry)
           when Organization::INDUSTRY_NURSING_HOUSE
             organizations_nhs_path
           when Organization::INDUSTRY_UNIVERSITY
             organizations_univs_path
           end
    if path
      session[:staff_id] = resource.id
      redirect_to path
    else
      # do nothing
    end
  end

  action_item :org_signin, only: [:edit, :show] do
    link_to(
      "施設管理画面にログインする",
      org_signin_admin_organization_staff_path(params[:id]),
      method: :post,
      confirm: '施設管理画面にログインしますか？'
    ) if resource.organization
  end
end
