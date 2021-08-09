module NotificationDecorator
  def conversation_partner_sex
    I18n.t("...." + conversation_partner.sex_name, locale: user.default_locale)
  end

  def conversation_partner_hobbies
    conversation_partner.hobbies.
      map {|h| user.teacher? ? h.name_ja : h.name_en }.
      join(", ")
  end
end
