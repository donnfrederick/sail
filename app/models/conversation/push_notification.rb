class Conversation
  # 開始時間1分前になった通話予約にPUSH通知
  def self.push_notifications
    push_client = ::PushNotification.new

    conversations = queued.where(start_at: Time.zone.now..(Time.zone.now + 1.minutes))
    conversations.each do |conversation|
      users = conversation.users
      users.each do |user|
        partner = (users - [user]).first
        next if partner.nil?

        title = I18n.t("notification.conversation_start.title", locale: user.default_locale, user_name: partner.name_en)
        body  = I18n.t("notification.conversation_start.body",  locale: user.default_locale, user_name: partner.name_en)

        push_client.call(
          title:   title,
          message: body,
          url:     "/#{user.type.downcase.pluralize}/mypage",
          token:   (user.belongs_to_device? ? user.device_fcm_token : user.fcm_token)
        )
      end
    end
  end
end
