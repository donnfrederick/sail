namespace :conversation do
  #展開のテストしてまーす！

  desc "開始1分前になった通話予約にPUSH通知をする"
  task push_notifications: :environment do
    Conversation.push_notifications
  end

  desc "WebSocket:ブロードキャスト処理をまとめて実行する"
  task broadcasts: :environment do
    Conversation.broadcast_change_device_users
    Conversation.broadcast_open_conversations
    Conversation.broadcast_close_soon_conversations
  end

  desc "会話時間をすぎた進行中または開始待ちの会話を終了する"
  task finish_timeout: :environment do
    Conversation.finish_timeout
  end

  # desc "開始時間までにマッチングしなかった会話を終了する"
  # task close_timeout: :environment do
  #   Conversation.close_timeout
  # end

  desc "開始時間までにマッチングしなかった会話を終了する"
  task close_waiting_timeout: :environment do
    Conversation.close_waiting_timeout
  end

  desc "WebSocket: 会話の開始2分前にユーザー切替をブロードキャストする"
  task change_user: :environment do
    Conversation.broadcast_change_device_users
  end

  desc "WebSocket: 会話の開始をブロードキャストする"
  task open: :environment do
    Conversation.broadcast_open_conversations
  end

  desc "WebSocket: 会話終了1分前をブロードキャストする"
  task close_soon: :environment do
    Conversation.broadcast_close_soon_conversations
  end

  desc "会話が行われているのに正常にフラグが立っていないものを補足する"
  task check_all_status: :environment do
    ConversationStatusCheckService.check_all
  end

  desc "ReservableConversation を削除する"
  task cleanup_reservations: :environment do
    ReservableConversation.delete_all_expired
    ReservableConversation.delete_all_closed
  end

  desc "現在開始時間に入っている会話の接続状況ログを取る"
  task update_connection_statuses: :environment do
    Conversation.update_connection_statuses
  end

  desc "ユーザーを変更する"
  task :replace_user, [:conversation_id, :from_user_id, :to_user_id] => :environment do |_task, args|
    uc = UsersConversation.where(conversation_id: args[:conversation_id].to_i, user_id: args[:from_user_id].to_i).first
    uc.user_id = args[:to_user_id].to_i
    uc.save
  end

  desc "日時を変更する"
  task :reschedule, [:conversation_id, :start_at] => :environment do |_task, args|
    conversation = Conversation.find_by(id: args[:conversation_id].to_i)
    student = conversation.student
    teacher = conversation.teacher
    conversation.delete

    # TODO スケジュール変更の通知を出したほうがいい
    if false
      notificated_at = Time.now + 3.minutes
      notification = Notification.new
      notification.user_id = conversation.student_id
      notification.title_en = "Reservation has been changed from 20:30 to 11:30"
      notification.body_en  = "Your reservation has been changed from 20:30 to 11:30 on December 10th. Please make sure your schedule again and be ready for the conversation. Thank you so much for arrangement."
      notification.notificated_at = notificated_at
      notification.scope = Notification::SCOPE_INDIVIDUAL
      notification.save
    end

    start_at = Time.parse(args[:start_at])
    conversation = Conversation.new({
                                        start_at: start_at,
                                        end_at: start_at + Conversation::DURATION
                                    })
    conversation.users << student if student.present?
    conversation.users << teacher if teacher.present?
    conversation.save
  end

  desc "未確定リクエスト枠で会話開始時間をすぎているものは自動キャンセル"
  task expire_requests: :environment do
    Conversation.expire_requests
  end

end
