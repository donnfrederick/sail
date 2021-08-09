class CustomMailer < ApplicationMailer
  default from: Settings.email_address.helte_corp

  add_template_helper PathHelper

  def warn_absence_en(user)
    @user = user

    mail(
      to:      user.email,
      subject: "Please make sure you can attend in your reserved conversations | Sail",
      )
  end
end
