ActiveAdmin.register Teacher do
  menu priority: 30

  actions :all

  permit_params :username, :name_ja, :name_en, :sex, :phone_number,
    :country, :timezone, :email, :password, :desired_condition, :introduce,
    :picture, :highly_reliable, :suspicious, :lateness, :organization_device_id,
    :invalid_as_foreigner, :invalid_as_ridiculous,:deleted_at,
    organization_section_ids: [], hobby_ids: [], purpose_ids: []

  sidebar "Org user import", only: :index do
    render 'shared/import'
  end

  index do
    selectable_column
    id_column
    column :picture do |c|
      url = c.picture.try(:url, :small)
      url.nil? ? nil : image_tag(url.to_s, size: "100x100")
    end
    column :name
    column :sex do |c|
      User::SEX_NAMES[c.sex]
    end
    column :organization_sections do |c|
      links = []
      c.organization_sections.each do |section|
        links << link_to(section.breadcrumb_name, admin_organization_section_path(section))
      end
      raw links.join("<br>")
    end
    column :registered_at

    actions

    column :ban do |c|
        if c.followed_up?
          para raw "制限中"
        elsif c.pairs_from_user.exists?
          para raw "制限中"
        else
          para raw "通常利用"
        end

      para raw "<a data-method='post' href='/admin/pairs/ban_from_index?from_user_id=#{c.id}'>追加</a>"
      para raw "<a data-method='delete' href='/admin/pairs/destroy_all_from_index?from_user_id=#{c.id}'>解除</a>"
    end
  end

  csv force_quotes: true do
    column :id
    column :registered_at
    column :name
    column :email
    column :sex, &:gender
    column :evaluate, &:most_popular_evaluation
    column :lateness
    column :reliability, &:reliability_marker
    column :last_accessed_at
  end

  filter :id_equals, label: '日本人 ID'
  filter :by_email_with_downcase, as: :string, label: 'Email'
  filter :username
  filter :name_ja
  filter :created_at, label: '登録日時'

  show do
    attributes_table do
      row :id

      row :picture do |c|
        url = c.picture.try(:url, :small)
        url.nil? ? nil : image_tag(url.to_s, size: "100x100")
      end
      row :online do |c|
        raw c.online_marker
      end
      row :name
      row :phone_number
      row :email
      row :sex do |c|
        User::SEX_NAMES[c.sex]
      end
      # row :level
      row :country do |c|
        country = ISO3166::Country[c.country]
        country ? sprintf("%s (%s)", *country.translated_names) : nil
      end
      row :timezone
      row :evaluate do |c|
        rows = c.full_evaluations + ["----------------", "(会話回数: #{c.conversations.finished.count})"]
        raw rows.join("<br />")
      end
      row :lateness
      row :absence
      row :hobbies do |c|
        c.hobbies.map(&:name).join(", ")
      end
      row :purposes do |c|
        c.purposes.map(&:name).join(", ")
      end
      row :desired_condition do |c|
        User::DESIRED_CONDITION_NAMES[c.desired_condition]
      end
      row :reliability, &:reliability
      row :organizations do |c|
        links = []
        c.organizations.each do |organization|
          links << link_to(organization.name, admin_organization_path(organization))
        end
        raw links.join("<br>")
      end
      row :organization_sections do |c|
        links = []
        c.organization_sections.each do |section|
          links << link_to(section.name, admin_organization_section_path(section))
        end
        raw links.join("<br>")
      end
      row :organization_device do |c|
        if c.organization_device
          raw link_to(c.organization_device.breadcrumb_name, admin_organization_device_path(c.organization_device))
        end
      end
      row :status do |c|
        if c.followed_up?
          raw "Helteやテスターによるフォロー中 (他のユーザーとはマッチングしない)"
        elsif c.pairs_from_user.exists?
          if c.pairs_from_user.map(&:id).sort == c.blocks_from_user.map(&:id).sort
            raw "制約中またはクローズド利用中 (ただしデッドロック状態)"
          elsif c.pairs_from_user.map(&:id).sort == c.blocks_to_user.map(&:id).sort
            raw "制約中またはクローズド利用中 (ただしデッドロック状態)"
          else
            raw "制約中またはクローズド利用中"
          end
        elsif c.conversations.completed.exists?
          raw "通常利用中"
        else
          raw "未会話のユーザー"
        end
      end
      row :blocked_users do |c|
        links = c.blocks_from_user.map do |blocked_user|
          link_to(blocked_user.name_en, admin_student_path(blocked_user)) if blocked_user.present?
        end
        raw links.join("<br>")
      end
      row :blocker_users do |c|
        links = c.blocks_to_user.map do |blocker_user|
          link_to(blocker_user.name_en, admin_student_path(blocker_user)) if blocker_user.present?
        end
        raw links.join("<br>")
      end
      row :pairs_from_user do |c|
        links = []
        Pair.where(from_user_id: c.id).includes(:to_user).find_each do |pair|
          links << link_to(pair.to_user.name_en, admin_student_path(pair.to_user)) if pair.to_user.present?
        end
        raw links.join("<br>")
      end
      row :pairs_to_user do |c|
        links = []
        Pair.where(to_user_id: c.id).includes(:from_user).find_each do |pair|
          links << link_to(pair.from_user.name_en, admin_student_path(pair.from_user)) if pair.from_user.present?
        end
        raw links.join("<br>")
      end
      row :paired_users do |c|
        users = User.where(id: c.paired_users).all
        links = users.map do |paired_user|
          link_to(paired_user.name_en, admin_student_path(paired_user))
        end
        raw links.join("<br>")
      end
      row :recent_accesses do |c|
        raw c.recent_accesses
      end
      row :registered_at
      row :introduce
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    f.inputs 'User Details' do
      f.input :picture, hint: image_tag(f.object.picture.url(:small).to_s, size: "100x100")
      f.input :name_ja, hint: "姓・名の間を「半角スペース」で区切ってください"
      # f.input :name_en, hint: "姓・名の間を「半角スペース」で区切ってください"
      f.input :email
      f.input :phone_number
      f.input :password
      f.input :sex, as: :select, collection: User::SEX_NAMES.invert
      # f.input :level, as: :select, collection: User::LEVELS
      f.input :country, as: :country,
                        priority_countries: %w(JP)
      f.input :timezone, collection: TZInfo::Timezone.all_identifiers
      f.input :evaluate, input_html: { disabled: true }
      f.input :lateness, input_html: { disabled: true }
      f.input :hobbies,  input_html: { size: Hobby.count },
                         hint: "Ctrl (または、Command) を押しながら、3つ選択してください"
      f.input :purposes, collection: Purpose.by_teacher,
                         input_html: { size: Purpose.by_teacher.count },
                         hint: "Ctrl (または、Command) を押しながら、複数選択してください"
      f.input :desired_condition, as: :select,
                                  collection: User::DESIRED_CONDITION_NAMES.invert,
                                  include_blank: false
      f.input :highly_reliable
      f.input :suspicious
      f.input :invalid_as_foreigner
      f.input :invalid_as_ridiculous
      f.input :organization_sections, input_html: { multiple: nil },
                                      include_blank: true,
                                      collection: OrganizationSection.nursing_houses.order_by_organization.map{|x| [x.breadcrumb_name, x.id] }
      f.input :organization_device, include_blank: true,
                                    collection: OrganizationDevice.order_by_organization.map{|x| [x.breadcrumb_name, x.id] }
      f.input :introduce
    end
    f.actions
    if f.object.followed_up?
      para raw "<fieldset class='actions'><ol><li class='cancel'><a data-method='delete' href='/admin/pairfollowup/destroy?user_id=#{f.object.id}'>フォローアップを解除する</a></li></ol></fieldset>"
    else
      para raw "<fieldset class='actions'><ol><li class='cancel'><a data-method='post' href='/admin/pairfollowup/create?user_id=#{f.object.id}'>フォローアップを設定する</a></li><li class='cancel'><a data-method='post' href='/admin/pairfollowup/create?user_id=#{f.object.id}&only_admin=1'>Helteメンバーとのみフォローアップを設定する</a></li></ol></fieldset>"
    end
    para raw "<fieldset class='actions'><ol><li class='cancel'><a data-method='delete' href='/admin/pairs/destroy_all?from_user_id=#{f.object.id}'>制約をすべて解除する</a></li></ol></fieldset>"
    para raw "<fieldset class='actions'><ol><li class='cancel'><a data-method='post' href='/admin/pairs/ban?from_user_id=#{f.object.id}'>このユーザーをバンする</a></li></ol></fieldset>"
  end


  controller do
    def create
      redirect_to :admin_teachers, notice: "No import file" and return if params[:commit] == 'import' && params[:import_file].nil?
      if params[:import_file].present?
        if bulk_new(params[:import_file].path) then redirect_to :admin_teachers and return else redirect_to :admin_teachers, notice: "CSV is not right format" and return end
      end
      params[:teacher].delete(:phone_number) if params[:teacher][:phone_number].blank?
      super
    end

    def update
      params[:teacher].delete(:phone_number) if params[:teacher][:phone_number].blank?
      if permitted_params[:teacher][:invalid_as_foreigner] == "1"
        resource.invalid_as_foreigner!
        if permitted_params[:teacher][:invalid_as_ridiculous] == "1"
          resource.invalid_as_ridiculous!
        end
      elsif permitted_params[:teacher][:invalid_as_ridiculous] == "1"
        resource.invalid_as_ridiculous!
      else
        resource.valid_as_not_foreigner!
        resource.valid_as_not_ridiculous!
      end
      super
    end

    private
    def bulk_new(file)
      return false unless ['name', 'sex', 'email', 'timezone', 'country','organization_section_id','desired_condition'].all?{|chk_word| CSV.read(file,headers: true).headers.include?(chk_word)}
      CSV.foreach(file, headers: true) do |row|
        email= Teacher.encrypt_email(row['email'])
        next if User.find_by(encrypted_email: email).present?
        user = User.new
        user.type = "Teacher"
        user.name_ja = row['name']
        user.password = '12345678'
        user.sex = row['sex']
        user.email = row['email']
        user.timezone = row['timezone']
        user.country = row['country']
        user.desired_condition = row['desired_condition']
        user.organization_section_ids = row['organization_section_id']
        user.save!(validate: false)
      end
      true
    end
  end
end
