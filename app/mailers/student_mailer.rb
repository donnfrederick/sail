class StudentMailer < ApplicationMailer
  default from: "info@sail.helte.jp"

  def thanks_registration(student)
    @user = student

    mail(
      to:      @user.email,
      # subject: "Thank you for registration | Sail",
      subject: "Thank you for registration! | Sailで日本の人とおはなししましょう",
      )
  end

  def follow_up_2nd_day(student)
    @user = student

    mail(
      to:      @user.email,
      subject: "Tips for good conversations | Sail",
      )
  end

  def follow_up_next_reservation(student, notification)
    @user = student
    @notification = notification
    @favorite_teachers_conversations = student.favorite_users_recent_conversations.sort_by(&:start_at)

    mail(
      to:      @user.email,
      subject: "#{notification.title_en} | Sail",
      )
  end

  def follow_up_next_reservation_with_sorry(student, notification)
    @user = student
    @notification = notification
    @favorite_teachers_conversations = student.favorite_users_recent_conversations.sort_by(&:start_at)

    mail(
      to:      @user.email,
      subject: "#{notification.title_en} | Sail",
      )
  end

  def password_reset(student)
    @user = student

    logger.debug { "\n\n\nPASSWORD_RESET_URL:\n#{@user.password_reset_url}\n\n\n" }

    mail(
      to:      @user.email,
      subject: "Change password | Sail"
    )
  end
end
