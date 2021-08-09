class Conversation
  CHANGE_DEVICE_USER_TIME = 2.minutes # 同端末のユーザー切替を通知する
  CLOSE_SOON_TIME         = 1.minutes # 会話終了通知を broadcast するタイミング
  LATE_TIME               = 3.minutes # 何分遅れを遅刻とみなすか

  # 開始時間になった通話予約に broadcast
  def broadcast_open
    broadcast_channel(:open)
  end

  # 終了1分前になった通話予約に broadcast
  def broadcast_close_soon
    broadcast_channel(:close_soon, { comment: I18n.t("conversation.close_soon.comment") })
  end

  def broadcast_close
    broadcast_channel(:close) if self.status_queued? || self.status_progress?
  end

  # 遅刻メッセージを broadcast
  def broadcast_late(user)
    I18n.locale = user.default_locale

    body = {
      channel:      "ConversationsChannel",
      action:       :late,
      conversation: ConversationSerializer.new(self).to_hash,
      comment:      I18n.t("conversation.late.comment", locale: user.default_locale)
    }

    ConversationsChannel.broadcast_to user, body
  end

  # 施設ユーザーのみ
  # 通話予約の 2分前 にユーザー切替を broadcast
  def broadcast_change_user
    return nil if teacher.nil?
    return nil if teacher == teacher.online_device_user
    return nil if blocked?

    ConversationsChannel.broadcast_to(teacher.online_device_user, {
      channel: "ConversationsChannel",
      action:  :change_user,
      user:    {id: teacher.id},
    })
  end

  # 開始時間になった通話予約に broadcast
  def self.broadcast_open_conversations
    queued.current.each do |conversation|
      conversation.broadcast_open
    end
  end

  # 終了1分前になった通話に broadcast
  def self.broadcast_close_soon_conversations
    progress.end_at_by(Time.zone.now + CLOSE_SOON_TIME).each do |conversation|
      conversation.broadcast_close_soon
    end
  end

  # 施設ユーザーのみ
  # 通話予約の 2分前〜終了時間 にユーザー切替を broadcast
  def self.broadcast_change_device_users
    conversations = queued.where(
      start_at: Time.zone.now..(Time.zone.now + CHANGE_DEVICE_USER_TIME)
    )
    conversations += queued.current
    conversations.each do |conversation|
      conversation.broadcast_change_user
    end
  end

  # 参加者全員がオンラインか
  def online_now?
    unless users.map(&:online?).exclude? false
      return false if Sora::Connection.request_connection_peers(self.channel_id).count < 2
    end

    true
  end

  def broadcast_channel(action, options = {})
    body = {
      channel:      "ConversationsChannel",
      action:       action,
      conversation: ConversationSerializer.new(self).to_hash,
    }.merge(options)

    users.each do |user|
      I18n.locale = user.default_locale
      ConversationsChannel.broadcast_to user, body
    end
  end
end
