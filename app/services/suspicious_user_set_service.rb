class SuspiciousUserSetService < ApplicationService
  attr_reader :suspicious_user

  def initialize(suspicious_user)
    @suspicious_user = suspicious_user
  end

  def set
    suspicious_user.suspicious!
    cancel_upcoming_conversations
  end

  private

    def cancel_upcoming_conversations
      suspicious_user.conversations.queued.find_each do |c|
        cancel_service = ConversationCancelService.new(c)
        cancel_service.cancel_by_admin(true, restore: suspicious_user.student?)
      end
      warn_absence if suspicious_user.student?
    end

    def warn_absence
      CustomMailer.warn_absence_en(suspicious_user).deliver_now

      I18n.locale = suspicious_user.default_locale
      push_client = PushNotification.new
      push_client.notice(
        title:   notification.title_en,
        message: notification.body_en,
        url:     "#{ENV["APP_SERVICE_HOST"]}/students/notifications/#{notification.id}",
        token:   (suspicious_user.belongs_to_device? ? suspicious_user.device_fcm_token : suspicious_user.fcm_token),
      )
    end

    def notification
      @notification ||= Notification.notify_absence_warned(suspicious_user)
    end
end
