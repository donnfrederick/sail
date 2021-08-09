namespace :user do

  desc "ユーザーに関する集計を行う"
  task aggregate_all: :environment do
    User.aggregate_absence
    User.aggregate_lateness
    User.aggregate_evaluation_score
    User.aggregate_evaluation_funs
    User.aggregate_rated_conversation_levels
  end

  desc "アクセスログをRedisからDBに転記してRedisからクリーンアップする"
  task cleanup_redis_access_log_all: :environment do
    User.find_each do |user|
      next if user.access_log_value.nil?

      accesses = []
      user.access_log_value.split("\n").each do |v|
        json = JSON.parse(v)
        accesses << UserAccess.new(user: user, fullpath: json['fullpath'], user_agent: json['user_agent'], created_at: json['timestamp'])
      end
      UserAccess.import accesses
      user.access_log_clear!
    end
  end

  desc "登録日数に関係するシステムメールを送信する"
  task send_follow_up_on_days: :environment do
    Student.send_follow_up_2nd_day
    Teacher.send_follow_up_2nd_day
  end

end
