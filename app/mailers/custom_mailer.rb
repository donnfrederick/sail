class CustomMailer < ApplicationMailer
  default from: "info@helte-corp.com"

  add_template_helper PathHelper

  def warn_absence_en(user)
    @user = user

    mail(
      to:      user.email,
      subject: "Please make sure you can attend in your reserved conversations | Sail",
      )
  end
end
