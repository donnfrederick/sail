ActiveAdmin.register Issue do
  menu parent: "GroupPayment", priority: 30

  permit_params :user_id, :paid_amount, :conversations, :expired_at, :created_at, :succeeded, :prerogative, :type

  sidebar "Maidens/Topers Revival", only: :index do
    render 'shared/import'
  end

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
    column :type
    column :status
    column :paid_price
    column :expired_at do |c|
      c.expired_at.to_s
    end
    actions
  end

  filter :user, as: :select, collection: Student.all.map {|t| [t.id, "#{t.id}: #{t.name_en}"]}.to_h.invert
  filter :type, as: :select, collection: Issue::TYPE_NAMES.invert
  filter :created_at

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
      row :type_name
      row :status
      row :paid_price
      row :conversations
      row :transactions do |c|
        link = "/admin/point_transactions?utf8=✓&q%5Bissue_id_eq%5D=#{c.id}&commit=絞り込む&order=id_desc"
        link_to("詳細", link)
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
      row :data_id
      row :prerogative
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    if f.object.new_record?
      f.object.expired_at = (Time.zone.now + 1.month).strftime("%Y-%m-%d %H:00:00")
    end

    succeeded = f.object.new_record? ? true : f.object.succeeded

    f.inputs 'Issue Details' do
      f.protected_input :type, as: :select, collection: Issue::TYPE_NAMES.invert
      f.protected_input :user_id,  as: :select,
                        collection: Student.all.map{|u| ["#{u.id}: #{u.name_en}", u.id] },
                        include_blank: false
      f.protected_input :paid_amount
      f.input :conversations
      f.input :expired_at
      f.input :created_at
      f.input :prerogative
      f.input :succeeded, as: :hidden,
              input_html: { value: succeeded }
    end
    f.actions
  end

  controller do
    def create
      redirect_to :admin_issues, notice: "No import file" and return if params[:commit] == 'import' && params[:import_file].nil?

      if params[:import_file].present?
        if bulk_update(params[:import_file].path) then redirect_to :admin_issues and return else redirect_to :admin_issues, notice: "CSV is not right format" and return end
      end
      super
    end

    private
    def bulk_update(file)
      return false unless ['id', 'Issue_type', 'conversations', 'expired_at'].all?{|chk_word| CSV.read(file,headers: true, encoding: 'SJIS:UTF-8').headers.include?(chk_word)}
      CSV.foreach(file, headers: true, encoding: 'SJIS:UTF-8') do |row|
        next if User.find(row['id']).teacher?
        if student = Student.find_by(id: row['id'])
          if row['Issue_type'] == "FreeIssue"
            next if student.issues.where(type: 'FreeIssue').size == 0
            puts "#{student.id}:#{student.name}"
            student.issues.first.update(conversations: row['conversations'], expired_at: row['expired_at'])
          elsif row['Issue_type'] == "OrganizationSectionIssue"
            next if student.issues.where(type: 'OrganizationSectionIssue').size == 0
            puts "#{student.id}:#{student.name}"
            student.issues.find_by(type: "OrganizationSectionIssue").update(conversations: row['conversations'], expired_at: row['expired_at'])
          end
        end
      end
      true
    end
  end
end
