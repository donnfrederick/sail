# sail-encoderではディプロイ時に下記も手動で実行する
# bundle exec whenever --update-crontab --load-file config/schedule_compilation.rb

every 5.minutes do
  rake "compilation:invoke_queue"
end
