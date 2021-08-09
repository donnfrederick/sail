ActiveAdmin.register Organization do
  menu parent: I18n.t("activerecord.models.organization"), priority: 10

  permit_params :industry, :country, :name_ja, :name_en, :name_kana,
    :local_address, :phone_number, :picture, :statistics,
    organization_sections_attributes: [
      :id, :organization_id, :name_ja, :name_en, _destroy: :true,
      organization_devices_attributes: [
        :id, :model_number, :property_management_number,
        :checkout_at, :return_at, :organization_section_id, _destroy: :true,
      ],
      organization_staffs_attributes: [
        :id, :organization_id, :official_position, :email,
        :password, :phone_number, :organization_device_id,  _destroy: :true,
      ],
    ]
  scope :active, default: true do |organizations|
    organizations.order(id: :desc).where(deleted_at: nil)
  end
  scope "Nursery houses", :nursing_houses, default: true
  scope "Universities",   :universities

  index do
    selectable_column
    id_column
    column :picture do |c|
      url = c.picture.try(:url, :small)
      url.nil? ? nil : image_tag(url.to_s, size: "100x100")
    end
    column :country
    column :name do |c|
      "#{c.name_ja} (#{c.name_en})"
    end
    # column :deleted_at
    actions
  end

  filter :country, as: :select, collection: ISO3166::Country.all_names_with_codes
  filter :name_ja
  filter :name_en
  filter :name_kana

  show do
    attributes_table do
      row :id

      row :picture do |c|
        url = c.picture.try(:url, :small)
        url.nil? ? nil : image_tag(url.to_s, size: "100x100")
      end

      row :industry
      row :country
      row :name_ja
      row :name_en
      row :name_kana
      row :local_address
      row :phone_number
      row :statistics

      row :organization_sections do |c|
        rows = []
        rows << "<ul>"
        c.organization_sections.each do |section|
          rows << "<li>#{link_to(section.name, admin_organization_section_path(section))}</li>"
        end
        rows << "</ul>"
        raw rows.join("")
      end
      row :organization_staffs do |c|
        rows = []
        rows << "<ul>"
        c.organization_sections.each do |section|
          rows << "<li>#{link_to(section.name, admin_organization_section_path(section))}</li>"
          rows << "<ul>"
          section.organization_staffs.each do |staff|
            rows << "<li>#{link_to(staff.email, admin_organization_staff_path(staff))}</li>"
          end
          rows << "</ul>"
        end
        rows << "</ul>"
        raw rows.join("")
      end
      row :organization_devices do |c|
        rows = []
        rows << "<ul>"
        c.organization_sections.each do |section|
          rows << "<li>#{link_to(section.name, admin_organization_section_path(section))}</li>"
          rows << "<ul>"
          section.organization_staffs.each do |staff|
            rows << "<li>#{link_to(staff.email, admin_organization_staff_path(staff))}</li>"
            rows << "<ul>"
            if staff.organization_device
              staff.organization_device.tap do |device|
                rows << "<li>#{link_to(device.property_management_number, admin_organization_device_path(device))}</li>"
              end
            end
            rows << "</ul>"
          end
          rows << "</ul>"
        end
        rows << "</ul>"
        raw rows.join("")
      end
      row "課金適応可能数", :users do |c|
        seats = c.name_kana.delete("\b").to_i
        raw "#{seats + OrganizationSectionIssue.where(user: c.users.where(type: 'Student')).sum(:conversations)}/#{seats}"
      end
      row "ユーザー数", :users do |c|
        links = ["#{c.users.count} 人"]
        c.users.each do |user|
          links << if user.teacher?
                     link_to(user.name, admin_student_path(user))
                   else
                     issue_organization = " ★" if OrganizationSectionIssue.where(user: c.users.where(type: 'Student')).find_by(conversations: -1, user_id: user.id)
                     link_to(user.name, admin_student_path(user)) + issue_organization
                   end
        end
        raw links.join("<br>")
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    f.inputs "運営会社・大学" do
      if f.object.new_record?
        f.input :picture
      else
        f.input :picture, hint: image_tag(f.object.picture.url(:small).to_s, size: "100x100")
      end

      f.input :industry, as: :select,
                         collection: Organization::INDUSTRY_NAMES.invert,
                         include_blank: false
      f.input :name_ja
      f.input :name_en
      f.input :name_kana
      f.input :country
      f.input :local_address
      f.input :phone_number
      f.input :statistics
      f.input :deleted_at
    end

    f.inputs "施設・授業" do
      f.has_many :organization_sections, new_record: "施設・授業を追加する", heading: "施設・授業" do |section|

        section.input :name_ja
        section.input :name_en

        section.has_many :organization_staffs, new_record: "担当職員を追加する", heading: "担当職員" do |staff|
          staff.input :official_position
          staff.input :email
          staff.input :password
          staff.input :phone_number
        end
      end
    end
    f.actions
  end

  controller do

    def destroy
      organization = Organization.find(params[:id])
      organization.update(deleted_at: Time.current)
      redirect_to :admin_organizations
    end
  end
end
