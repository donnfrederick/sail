namespace :notification do
  desc "会話の1日前を通知する"
  task notify_remind_1day_ago: :environment do
    Notification.notify_remind_1day_ago
  end

  desc "会話の1時間前を通知する"
  task notify_remind_1hour_ago: :environment do
    Notification.notify_remind_1hour_ago
  end
  
  desc "会話の10分前を通知する"
  task notify_remind_10minutes_ago: :environment do
    Notification.notify_remind_10minutes_ago
  end

  desc "30日以上経過した通知を削除する"
  task cleanup_old_notifications: :environment do
    Notification.cleanup_old_notifications
  end

  desc "通知のキューを実行する"
  task perform_jobs: :environment do
    NotificationJobService.perform_jobs
  end
end
