class NotificationMailer < ApplicationMailer
  default from: "info@helte-corp.com"

  add_template_helper PathHelper

  def unread_message_ja(user, notification)
    @notification = notification

    mail(
      to:      user.email,
      subject: notification.title_ja + " | Sail",
    )
  end

  def unread_message_en(user, notification)
    @notification = notification

    mail(
      to:      user.email,
      subject: notification.title_ja + " | Sail",
      )
  end
end
