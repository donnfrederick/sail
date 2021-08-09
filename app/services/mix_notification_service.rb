class MixNotificationService
  attr_reader :notification

  def initialize(notification)
    @notification = notification
  end

  def send
    notification.reload
    return if notification.sent?

    notification.update(sent: true)
    send_push_notification_all
    send_push_notification_individually
    send_push_notification_all_students
    send_push_notification_all_teachers
    send_email_notification_all
    send_email_notification_individually
    send_email_notification_all_students
    send_email_notification_all_teachers
  end

  private

    def send_push_notification_all
      return if user.present? || notification.scope != Notification::SCOPE_ALL

      User.find_each do |user1|
        I18n.locale = user1.default_locale || "ja"
        push_client = PushNotification.new
        push_client.notice(
          title:   notification.title,
          message: notification.body,
          url:     "#{ENV["APP_SERVICE_HOST"]}/#{user1.type.downcase.pluralize}/notifications/#{notification.id}",
          token:   (user1.belongs_to_device? ? user1.device_fcm_token : user1.fcm_token),
          )
      end
    end

    def send_push_notification_all_students
      return if user.present? || notification.scope != Notification::SCOPE_STUDENTS

      Student.find_each do |student|
        I18n.locale = student.default_locale
        push_client = PushNotification.new
        push_client.notice(
          title:   notification.title,
          message: notification.body,
          url:     "#{ENV["APP_SERVICE_HOST"]}/#{student.type.downcase.pluralize}/notifications/#{notification.id}",
          token:   (student.belongs_to_device? ? student.device_fcm_token : student.fcm_token),
        )
      end
    end

    def send_push_notification_all_teachers
      return if user.present? || notification.scope != Notification::SCOPE_TEACHERS

      Teacher.find_each do |teacher|
        I18n.locale = teacher.default_locale
        push_client = PushNotification.new
        push_client.notice(
          title:   notification.title,
          message: notification.body,
          url:     "#{ENV["APP_SERVICE_HOST"]}/#{teacher.type.downcase.pluralize}/notifications/#{notification.id}",
          token:   (teacher.belongs_to_device? ? teacher.device_fcm_token : teacher.fcm_token),
          )
      end
    end

    def send_push_notification_individually
      return if user.nil? || notification.scope != Notification::SCOPE_INDIVIDUAL

      I18n.locale = user.default_locale
      push_client = PushNotification.new
      push_client.notice(
        title:   notification.title,
        message: notification.body,
        url:     "#{ENV["APP_SERVICE_HOST"]}/#{user.type.downcase.pluralize}/notifications/#{notification.id}",
        token:   (user.belongs_to_device? ? user.device_fcm_token : user.fcm_token),
        )
    end

    def send_email_notification_all
      return if user.present? || notification.scope != Notification::SCOPE_ALL

      User.find_each do |user1|
        if user1.teacher?
          NotificationMailer.unread_message_ja(user1, notification).deliver_now
        else
          NotificationMailer.unread_message_en(user1, notification).deliver_now
        end
      end
    end

    def send_email_notification_all_students
      return if user.present? || notification.scope != Notification::SCOPE_STUDENTS

      Student.find_each do |user1|
        NotificationMailer.unread_message_en(user1, notification).deliver_now
      end
    end

    def send_email_notification_all_teachers
      return if user.present? || notification.scope != Notification::SCOPE_TEACHERS

      Teacher.find_each do |user1|
        NotificationMailer.unread_message_ja(user1, notification).deliver_now
      end
    end

    def send_email_notification_individually
      return if user.nil? || notification.scope != Notification::SCOPE_INDIVIDUAL
      # return if user.nil? || notification.conversation.start_at.today? || notification.scope != Notification::SCOPE_INDIVIDUAL

      if user.teacher?
        NotificationMailer.unread_message_ja(user, notification).deliver_now
      else
        NotificationMailer.unread_message_en(user, notification).deliver_now
      end
    end

    def user
      @user ||= notification.user
    end
end
