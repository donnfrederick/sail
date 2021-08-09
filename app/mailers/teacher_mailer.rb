class TeacherMailer < ApplicationMailer
  default from: "info@sail.helte.jp"

  def thanks_registration(teacher)
    @user = teacher

    mail(
      to:      @user.email,
      subject: "Sailにご登録いただきありがとうございます | Sailカスタマーサポート",
    )
  end

  def follow_up_2nd_day(teacher)
    @user = teacher

    mail(
      to:      @user.email,
      subject: "Sailのおすすめポイント３つを紹介します | Sailカスタマーサポート",
      )
  end

  def follow_up_next_reservation(teacher, notification)
    @user = teacher
    @notification = notification
    @favorite_students_conversations = teacher.favorite_users_recent_conversations.sort_by(&:start_at)

    mail(
      to:      @user.email,
      subject: "#{notification.title_ja} | Sail",
      )
  end

  def follow_up_next_reservation_with_sorry(teacher, notification)
    @user = teacher
    @notification = notification
    @favorite_students_conversations = teacher.favorite_users_recent_conversations.sort_by(&:start_at)

    mail(
      to:      @user.email,
      subject: "#{notification.title_ja} | Sail",
      )
  end

  def password_reset(teacher)
    @user = teacher

    logger.debug { "\n\n\nPASSWORD_RESET_URL:\n#{@user.password_reset_url}\n\n\n" }

    mail(
      to:      @user.email,
      subject: "パスワードの再発行 | Sail"
    )
  end

  def highlighted_users(teacher, students)
    @user = teacher
    @students = students

    mail(
      to:      @user.email,
      subject: "日本語学習者ユーザーの方々を紹介します | Sailカスタマーサポート",
      )
  end
end
