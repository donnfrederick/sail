ActiveAdmin.register Coupon do
  menu parent: "GroupPayment", priority: 10

  # :pricing_table_id も controller で使っています
  permit_params :user_id, :name, :code

  index do
    selectable_column
    id_column
    column :user_name do |c|
      if c.user.nil?
        nil
      elsif c.user.teacher?
        link_to c.user_name, admin_teacher_path(c.user)
      elsif c.user.student?
        link_to c.user_name, admin_student_path(c.user)
      end
    end
    column :code
    column :name
    column :subscribers_count
    column :pricing_table do |c|
      c.pricing_table.try(:name)
    end
    column :expired_at do |c|
      c.expired_at.to_s
    end
    actions
  end

  filter :user, as: :select, collection: Student.all.map {|t| [t.id, "#{t.id}: #{t.name_en}"]}.to_h.invert

  show do
    attributes_table do
      row :id
      row :user_name do |c|
        if c.user.nil?
          nil
        elsif c.user.teacher?
          link_to c.user_name, admin_teacher_path(c.user)
        elsif c.user.student?
          link_to c.user_name, admin_student_path(c.user)
        end
      end
      row :name
      row :code
      row :subscribers_count
      row :subscription_amounts do |c|
        links = []
        issues = []
        c.users_coupons.map(&:issues).each do |issues_|
          issues_.each {|issue| issues << issue }
        end
        issue_groups = issues.
          sort_by {|issue| issue.created_at }.
          group_by {|issue| issue.month }
        issue_groups.each_with_index do |data|
          month, issues = data
          links << "<dt>#{month}</dt>"
          issues.each do |issue|
            user_link = if issue.user.nil?
                          ""
                        else
                          " (#{link_to(issue.user_name, admin_student_path(issue.user))})"
                        end
            links << "<dd>#{issue.created_at} - #{issue.paid_price}#{user_link}</dd>"
          end
          links << "<dd>(Total: #{issues.inject(0){ |sum, i| sum += i.price }.to_s(:delimited)} US Cents)</dd>"
        end
        raw links.join("<br>")
      end
      row :pricing_table do |c|
        c.pricing_table.try(:name)
      end
      row :expired_at do |c|
        c.expired_at.to_s
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

    current_pricing_table = if f.object.new_record?
      []
    else
      [f.object.pricing_table]
                            end

    selected_pricing_table_id = if f.object.new_record?
                                  PricingTable.disconnected.first.id
                                else
                                  f.object.pricing_table.id
                                end

    f.inputs 'Coupon Details' do
      f.protected_input :user_id,  as: :select,
                        collection: Student.all.map{|u| ["#{u.id}: #{u.name_en}", u.id] }
      f.input :name
      f.input :code
      f.input :pricing_table, as: :select,
                              collection: (PricingTable.disconnected.all + current_pricing_table).map{|u| ["#{u.id}: #{u.name}", u.id] },
                              selected: selected_pricing_table_id,
                              include_blank: false
    end
    f.actions
  end

  controller do
    def create
      coupon = Coupon.new(permitted_params["coupon"])
      if coupon.save
        pricing_table = PricingTable.find(params["coupon"]["pricing_table_id"].to_i)
        CouponsPricingTable.create(
          coupon: coupon,
          pricing_table: pricing_table,
          )

        redirect_to admin_coupon_path(coupon)
      else
        render template: "active_admin/resource/new"
        return
      end
    end

    def update
      unless resource.pricing_table.id === params["coupon"]["pricing_table_id"].to_i
        sub_resource = resource.coupons_pricing_table
        sub_resource.pricing_table_id = params["coupon"]["pricing_table_id"].to_i
        unless sub_resource.save
          resource.errors.add(:base, sub_resource.errors.full_messages)
        end

        if resource.errors.present?
          render template: "active_admin/resource/new"
          return
        end
      end

      super
    end
  end
end
