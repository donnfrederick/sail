ActiveAdmin.register OrganizationSection do
  menu parent: I18n.t("activerecord.models.organization"), priority: 20

  # 追加は Organization から行う
  actions :all, except: [:new, :create]

  permit_params :organization_id, :name_ja, :name_en, :tutoring, :statistics,
                :issue_expired_at, _destroy: :true,
    organization_staffs_attributes: [
      :id, :official_position, :email,
      :password, :phone_number, _destroy: :true,
    ]

  scope "Nursery houses", :nursing_houses, default: true
  scope "Universities",   :universities

  index do
    selectable_column
    id_column
    column :organization do |c|
      raw link_to(c.organization.name, admin_organization_path(c.organization))
    end
    column :name do |c|
      "#{c.name_ja} (#{c.name_en})"
    end
    column :tutoring

    actions
  end

  filter :organization, as: :select, collection: proc { Organization.all }
  filter :name_ja
  filter :name_en
  filter :tutoring

  show do
    attributes_table do
      row :id

      row :organization do |c|
        raw link_to(c.organization.name, admin_organization_path(c.organization))
      end

      row :name_ja
      row :name_en
      row :statistics

      row :organization_staffs do |c|
        rows = []
        rows << "<ul>"
        c.organization_staffs.each do |staff|
          rows << "<li>#{link_to(staff.email, admin_organization_staff_path(staff))}</li>"
        end
        rows << "</ul>"
        raw rows.join("")
      end
      row :organization_devices do |c|
        rows = []
        rows << "<ul>"
        c.organization_staffs.each do |staff|
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
        raw rows.join("")
      end
      row :tutoring
      row :issue_expired_at do |c|
        c.issue_expired_at.try(:to_s)
      end
      row "ユーザー数", :users do |c|
        links = ["#{c.users.count} 人"]
        c.users.each do |user|
          links << if user.teacher?
                     link_to(user.name, admin_teacher_path(user))
                   else
                     link_to(user.name, admin_student_path(user))
                   end
        end
        raw links.join("<br>")
      end
      row "レポート", :users do |c|
        rows = []
        rows << "<ul>"
        c.organization_devices.each do |device|
          rows << "<li>#{device.property_management_number}</li>"
          rows << "<ul>"
          MonthlyConversationReportPdf.terms(device.id).each do |term|
            year, month = term
            label = sprintf("%d年%d月", year, month)
            link = sprintf("/admin/report/monthly_conversations/%d/%d-%d", device.id, year, month)
            rows << "<li>#{link_to(label, link)}</li>"
          end
          rows << "</ul>"
        end
        rows << "</ul>"
        raw rows.join("")
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    text = I18n.t("active_admin.organization_sections.#{f.object.new_record? ? "create" : "update"}_description", default: "")
    para text unless text.empty?

    f.inputs "施設・授業" do
      f.input :organization, collection: Organization.all,
                             input_html: { disabled: !f.object.new_record? }
      f.input :name_ja
      f.input :name_en
      f.input :tutoring
      f.input :statistics
      f.input :issue_expired_at, as: :datetime_select
    end

    f.inputs "担当職員" do
      f.has_many :organization_staffs, new_record: "担当職員を追加する", heading: "担当職員" do |staff|
        staff.input :official_position
        staff.input :email
        staff.input :password
        staff.input :phone_number
      end
    end

    f.actions
  end
end
