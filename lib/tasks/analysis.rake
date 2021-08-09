namespace :analysis do

  desc "Each organization section's conversations"
  task sections_conversations:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::SectionsConversations.new weekly
    analytics.update_all!
  end

  desc "Student registrants"
  task student_registrants:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::StudentRegistrants.new weekly
    analytics.update_all!
  end

  desc "Teacher registrants"
  task teacher_registrants:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::TeacherRegistrants.new weekly
    analytics.update_all!
  end

  desc "Conversation schedules"
  task conversation_schedules:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::ConversationSchedules.new weekly
    analytics.update_all!
  end

  desc "Conversation creations"
  task conversation_creations:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::ConversationCreations.new weekly
    analytics.update_all!
  end

  desc "Successful conversations"
  task successful_conversations:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::SuccessfulConversations.new weekly
    analytics.update_all!
  end

  desc "Failure conversations"
  task failure_conversations:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::FailureConversations.new weekly
    analytics.update_all!
  end

  desc "Unmatched conversations"
  task unmatched_conversations:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::UnmatchedConversations.new weekly
    analytics.update_all!
  end

  desc "週ごとに新規登録の学生ユーザーの国籍をランキングで集計します"
  task country_registrants:  :environment do
    weekly = Analytics::WeeklyStatsFactory.new
    analytics = Analytics::CountryRegistrants.new weekly
    analytics.update_all!
  end

  desc "会話履歴をリストアップする [start_at: string]"
  task :conversations, [:start_at] => :environment do |_task, args|
    lines = []
    since = Time.parse(args[:start_at])
    Conversation.where("start_at > ?", since).order("start_at ASC").each do |conversation|
      if conversation.users.count == 2
        time = conversation.start_at + 9.hours
        lines << time.strftime("%Y/%m/%d %H:%M") + " - " + conversation.student.name + " - " + conversation.teacher.name
      end
    end
    lines.each do |line|
      puts line
    end
  end

  desc "特定のユーザーの会話履歴を取得する [start_at: string, type: string, user_id: int]"
  task :conversations, [:start_at, :type, :user_id] => :environment do |_task, args|
    type = if args[:type] == "student" || args[:type] == "teacher"
             args[:type]
           else
             nil
           end

    unless type.nil?
      user_id = args[:user_id].to_i
      UsersConversation.where(user_id: user_id).order("id DESC").all.each do |uc|
        conversation = uc.conversation
        if conversation.present?
          start_at = conversation.start_at + 9.hours
          start_at_str = start_at.strftime("%Y/%m/%d %H:%M")
          name = type == "student" ? conversation.teacher.name : conversation.student.name
          puts start_at_str + " - " + name + " (" + uc.user.name + ")"
        end
      end
    end
  end

  desc "日本語レベルが高くて登録してからMヶ月未満のユーザートップNを選出する [month: int, limit: int]"
  task :top_students, [:months, :limit] => :environment do |_task, args|
    since = Time.now - args[:months].to_i.months
    limit = args[:limit].to_i
    Student.where("level < 4").where("created_at > ?", since).where.not(timezone: "Asia/Tokyo").order("level ASC").limit(limit).each do |student|
      puts student.name + ", " + student.email + ", " + student.level.to_s + ", " + student.country + ", " + student.timezone
    end
  end

end
