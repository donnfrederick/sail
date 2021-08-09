# bin/rails runner "Transfers::GenerateYaml.all"

class Transfers::GenerateYaml
  IMPORT_DIR = Rails.root.join("db/transfers/").to_s
  EXPORT_DIR = Rails.root.join("db/datasources/").to_s

  def self.all
    users
    users_hobbies
    users_organization_sections
    organizations
    organization_devices
    conversations
  end

  # ユーザー / スタッフの登録
  def self.users
    sexes = {
      "1" => User::SEX_MALE,       # 男性
      "0" => User::SEX_FEMALE,     # 女性
      "2" => User::SEX_APPLICABLE, # 適用不能
    }

    # User
    # id	screen_name	password	username	sex	timezone	email	since	edit	active	birthday
    file = File.join(IMPORT_DIR, "users.tsv")
    data = CSV.read(file, col_sep: "\t")

    # Teacher
    teacher_file = File.join(IMPORT_DIR, "user_teachers.tsv")
    teacher_data = CSV.read(teacher_file, col_sep: "\t")
    teacher_ids  = teacher_data.map{|x| x[1] }

    # Student
    # NOTE: teacher_ids と student_ids が重複しているのは staff_ids のもの
    student_file = File.join(IMPORT_DIR, "user_students.tsv")
    student_data = CSV.read(student_file, col_sep: "\t")
    student_ids  = student_data.map{|x| x[1] }

    # Student.level
    student_level_file = File.join(IMPORT_DIR, "student_levels.tsv")
    student_level_data = CSV.read(student_level_file, col_sep: "\t")
    student_levels = {}
    student_level_data.each do |d|
      student_levels[d[1]] = ((d[2].to_f)/2).round
    end

    # OrganizationStaff.organization_device_id
    # id	user_id	nh_id
    device_file = File.join(IMPORT_DIR, "user_helpers.tsv")
    device_data = CSV.read(device_file, col_sep: "\t")
    staff_relations = {}
    device_data.each do |d|
      staff_relations[d[1]] = {
        organization_device_id:  d[0],
        organization_section_id: d[2],
      }
    end

    # Teacher.orgnization_device_id
    user_device_file = File.join(IMPORT_DIR, "user_children.tsv")
    user_device_data = CSV.read(user_device_file, col_sep: "\t")
    user_device_ids = {}
    user_device_data.each do |d|
      next if staff_relations[d[2]].nil?
      user_device_ids[d[1]] = staff_relations[d[2]][:organization_device_id]
    end

    # OrganizationStaff
    staffs = []
    sections_staffs = []
    data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする

      # Staff
      if staff_ids.include? d[0]
        staffs << {
          id:              d[0],
          password_digest: d[2],
          username:        d[3],
          email:           d[6].delete(' ').downcase,
          created_at:      d[7],
          updated_at:      d[8],
          organization_device_id: staff_relations[d[0]][:organization_device_id],
        }
        sections_staffs << {
          organization_section_id: staff_relations[d[0]][:organization_section_id],
          organization_staff_id:   d[0],
        }
      end
    end

    # User
    users  = []
    data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする

      # User
      unless staff_ids.include? d[0]
        type = if teacher_ids.include? d[0]
                 Teacher.name
               elsif student_ids.include? d[0]
                 Student.name
               end

        if type.nil?
          print d[0]
          next
        end

        users << {
          id:                d[0],
          name_ja:           d[1],
          name_en:           d[1],
          password_digest:   d[2],
          username:          d[3],
          sex:               (sexes[d[4]] || User::SEX_UNKNOWN),
          timezone:          d[5],
          email:             (d[6].nil? ? nil : d[6].to_s.delete(' ').downcase),
          created_at:        d[7],
          updated_at:        d[8],
          is_activated:      d[9],
          birthday:          d[10],
          type:              type,
          desired_condition: User::DESIRED_CONDITION_SKILLFUL,
          country:           (d[5]=="UTC" ? "JP" : ztc[d[5]].first),
          level:             (student_levels[d[0]] || 5),
          # TODO: picture: ,
          # hobbies,
          # purposes,
          organization_device_id: user_device_ids[d[0]],
        }
      end
    end

    # 書き出し
    YAML.dump(staffs, File.open(File.join(EXPORT_DIR, "organization_staffs.yml"), "w"))
    YAML.dump(sections_staffs, File.open(File.join(EXPORT_DIR, "organization_sections_staffs.yml"), "w"))
    YAML.dump(users, File.open(File.join(EXPORT_DIR, "users.yml"), "w"))
  end

  def self.users_hobbies
    hobbies = {
      "1" => nil, # 文化 は廃止
      "2" => 4,   # 歴史
      "3" => 5,   # 音楽
      "4" => 3,   # スポーツ
      "5" => nil, # ヘルテ は廃止
    }

    # Student.hobbies
    # id	topic_id	student_id	since	edit
    file = File.join(IMPORT_DIR, "student_topics.tsv")
    data = CSV.read(file, col_sep: "\t")

    users_hobbies = []
    data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする
      next if hobbies[d[1]].nil?
      next if staff_ids.include? d[2]
      next if removed_user_ids.include? d[2]

      users_hobbies << {
        hobby_id: hobbies[d[1]],
        user_id:  d[2],
      }
    end

    # 書き出し
    YAML.dump(users_hobbies, File.open(File.join(EXPORT_DIR, "users_hobbies.yml"), 'w'))
  end

  def self.users_organization_sections
    # UsersOrganizationSection
    # id	child_id	parent_id
    file = File.join(IMPORT_DIR, "user_children.tsv")
    data = CSV.read(file, col_sep: "\t")

    # UsersOrganizationSection.organization_staff_id
    # id	user_id	nh_id
    device_file = File.join(IMPORT_DIR, "user_helpers.tsv")
    device_data = CSV.read(device_file, col_sep: "\t")
    section_ids = {}
    device_data.each do |d|
      section_ids[d[1]] = d[2]
    end

    users_organization_sections = []
    data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする
      next if staff_ids.include? d[1]
      next if section_ids[d[2]].nil?

      users_organization_sections << {
        user_id:                 d[1],
        organization_section_id: section_ids[d[2]],
      }
    end

    # 書き出し
    YAML.dump(users_organization_sections, File.open(File.join(EXPORT_DIR, "users_organization_sections.yml"), 'w'))
  end

  # 組織の登録
  # 現在、登録されているのは国内施設のみ
  def self.organizations
    # Organization
    # id	name
    file = File.join(IMPORT_DIR, "nh_companies.tsv")
    data = CSV.read(file, col_sep: "\t")

    organizations = []
    data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする

      organizations << {
        id:       d[0],
        name_ja:  d[1],
        country:  'JP',
        industry: Organization::INDUSTRY_NURSING_HOUSE,
      }
    end
    
    # OrganizationSection
    # id	company_id	name
    file = File.join(IMPORT_DIR, "nhs.tsv")
    data = CSV.read(file, col_sep: "\t")

    sections = []
    data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする

      sections << {
        id:              d[0],
        organization_id: d[1],
        name_ja:         d[2],
      }
    end

    # 書き出し
    YAML.dump(organizations, File.open(File.join(EXPORT_DIR, "organizations.yml"), 'w'))
    YAML.dump(sections, File.open(File.join(EXPORT_DIR, "organization_sections.yml"), 'w'))
  end

  def self.organization_devices
    # OrganizationDevice
    # id	user_id	nh_id
    file = File.join(IMPORT_DIR, "user_helpers.tsv")
    data = CSV.read(file, col_sep: "\t")

    devices = []
    data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする

      devices << {
        id:                         d[0],
        model_number:               "HUAWEI MediaPad T2 10.0 Pro",
        property_management_number: "MediaPad-T2-#{d[0]}", 
        name:                       "MediaPad-T2-#{d[0]}", 
        organization_section_id:    d[2],
      }
    end

    # 書き出し
    YAML.dump(devices, File.open(File.join(EXPORT_DIR, "organization_devices.yml"), 'w'))
  end

  # lesson -> ticket -> teacher (student) -> user.id
  def self.conversations
    statuses = {
      "0"   => Conversation::STATUS_CANCELED,
      "1"   => Conversation::STATUS_WAITING,
      "2"   => Conversation::STATUS_QUEUED,
      "3"   => Conversation::STATUS_COMPLETED,
    }

    # id	teacher_id	date_time	public
    user_teacher_file = File.join(IMPORT_DIR, "user_teachers.tsv")
    user_teacher_data = CSV.read(user_teacher_file, col_sep: "\t")
    user_teacher_ids = {}
    user_teacher_data.each do |d|
      user_teacher_ids[d[0]] = d[1]
    end
    # id	user_student_id	date_time	public
    user_student_file = File.join(IMPORT_DIR, "user_students.tsv")
    user_student_data = CSV.read(user_student_file, col_sep: "\t")
    user_student_ids = {}
    user_student_data.each do |d|
      user_student_ids[d[0]] = d[1]
    end

    # id	ticket_id	student_id	accepted	create_time	read	comment	attendance_student	attendance_teacher	system_quality	duration
    lesson_file = File.join(IMPORT_DIR, "ticket_lessons.tsv")
    lesson_data = CSV.read(lesson_file, col_sep: "\t")
    
    # id	teacher_id	date_time	public
    teacher_ticket_file = File.join(IMPORT_DIR, "teacher_tickets.tsv")
    teacher_ticket_data = CSV.read(teacher_ticket_file, col_sep: "\t")
    tickets = {}
    teacher_ticket_data.each do |d|
      tickets[d[0]] = {
        teacher_id: d[1],
        date_time:  d[2],
        public:     d[3],
      }
    end

    conversations = []
    users_conversations = []
    lesson_data.each_with_index do |d, i|
      next if i.zero? # ヘッダ行はスキップする

      ticket          = tickets[d[1]]
      teacher_user_id = user_teacher_ids[ticket[:teacher_id]]
      student_user_id = user_student_ids[d[2]]
      
      next if staff_ids.include? teacher_user_id
      next if staff_ids.include? student_user_id

      conversations << {
        id:         d[0],
        status:     statuses[d[3]],
        start_at:   ticket[:date_time],
        # end_at:     "",
        created_at: d[4],
        updated_at: d[4],
        channel_id: "worldc-#{d[0]}",
      }
      # teacher
      users_conversations << {
        user_id:         teacher_user_id,
        conversation_id: d[0],
        # evaluation:,
        onlined:         true,
        is_late:         false,
        created_at:      d[4],
        updated_at:      d[4],
      }
      # student
      users_conversations << {
        user_id:         student_user_id,
        conversation_id: d[0],
        # evaluation:,
        onlined:         true,
        is_late:         false,
        created_at:      d[4],
        updated_at:      d[4],
      }
    end

    # 書き出し
    YAML.dump(conversations, File.open(File.join(EXPORT_DIR, "conversations.yml"), 'w'))
    YAML.dump(users_conversations, File.open(File.join(EXPORT_DIR, "users_conversations.yml"), 'w'))
  end

  # Timezone to CountryCode
  def self.ztc
    return @ztc if @ztc.present?

    @ztc = {}
    TZInfo::Country.all().each do |c|
      c.zone_identifiers.each do |z|
        @ztc[z] = [] unless @ztc.has_key?(z)
        @ztc[z].push(c.code)
      end
    end
    @ztc
  end

  def self.staff_ids
    return @staff_ids if @staff_ids.present?

    # OrganizationStaff
    staff_file = File.join(IMPORT_DIR, "user_helpers.tsv")
    staff_data = CSV.read(staff_file, col_sep: "\t")
    @staff_ids = staff_data.map{|x| x[1] }
  end

  # 既に物理削除されて存在しない user_id
  def self.removed_user_ids
    ["42", "223", "224", "225", "226", "228", "229", "234", "236", "237", "238", "239", "240", "242", "243", "244", "245", "247", "248", "250", "251", "254", "255", "256", "257", "259", "260", "261", "419", "420", "423", "427", "434", "435", "436", "438", "440", "442", "443", "444", "445", "446", "447", "451", "454", "456", "457", "458", "459", "460", "461", "462", "472", "473", "474", "484", "485", "486", "487", "488", "489", "490", "491", "494", "502", "504", "505", "508", "509", "510", "511", "513", "514", "515", "516", "517", "518", "536", "721", "722", "723", "733", "734", "735", "736", "737", "794", "795", "796", "834", "835", "836", "837", "838", "839", "840", "842", "843", "844", "860", "863", "864", "865", "866", "867", "868", "869", "870", "871", "872", "873", "874", "875", "917", "918", "919", "920", "941", "942", "994", "997", "998", "1000", "1020", "1047", "1050", "1051", "1052", "1053", "1054", "1055", "1056", "1057", "1058", "1059", "1060", "1085", "1086", "1087", "1088", "1089", "1090", "1091", "1092", "1115"]
  end
end
