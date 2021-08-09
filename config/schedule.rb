# bundle exec whenever --update-crontab

every 1.minutes do
  rake "conversation:cleanup_reservations"
  rake "conversation:broadcasts"
  rake "conversation:push_notifications"
  rake "conversation:change_user"
  rake "conversation:check_all_status"
  rake "conversation:close_waiting_timeout"
  rake "conversation:finish_timeout"
  rake "conversation:update_connection_statuses"
  rake "notification:perform_jobs"
  rake "notification:notify_remind_10minutes_ago"
  rake "notification:notify_remind_1hour_ago"
  rake "notification:notify_remind_1day_ago"
end

every 1.hours do
  rake "user:aggregate_all"
  rake "user:cleanup_redis_access_log_all"
end

every 1.days, at: '8:00 am' do
  rake "notification:cleanup_old_notifications"
  rake "user:send_follow_up_on_days"
end

# every 1.days, at: '00:00 am' do
#   rake "analysis:sections_conversations"
#   rake "analysis:student_registrants"
#   rake "analysis:teacher_registrants"
#   rake "analysis:conversation_schedules"
#   rake "analysis:conversation_creations"
#   rake "analysis:successful_conversations"
#   rake "analysis:failure_conversations"
#   rake "analysis:unmatched_conversations"
#   rake "analysis:country_registrants"
# end
