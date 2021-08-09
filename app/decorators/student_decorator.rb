module StudentDecorator
  def gender
    User::SEX_NAMES[self.sex] || "その他"
  end

  def online_marker
    if self.online?
      "<span style='color: #008000;'>●</span>"
    else
      "<span style='color: #cacaca;'>●</span>"
    end
  end

  def reliability_marker
    if self.highly_reliable?
      "◎"
    elsif self.suspicious?
      "△"
    else
      "○"
    end
  end

  def reliability(locale: nil)
    locale = I18n.locale if locale.nil?

    if self.highly_reliable?
      I18n.t("user.reliability.highly_reliable", locale: locale)
    elsif self.suspicious?
      I18n.t("user.reliability.suspicious", locale: locale)
    else
      I18n.t("user.reliability.other", locale: locale)
    end
  end

  def payment(locale: nil)
    locale = I18n.locale if locale.nil?

    if self.trial?
      I18n.t("user.payment.trial_user", locale: locale)
    elsif self.free?
      I18n.t("user.payment.free_user", locale: locale)
    elsif self.organization_section_paid?
      I18n.t("user.payment.organization_section_paid_user", locale: locale)
    elsif self.paid?
      I18n.t("user.payment.paid_user", locale: locale)
    else
      I18n.t("user.payment.expired_user", locale: locale)
    end
  end

  def most_popular_evaluation
    keywords = %w[evaluation_very_funny evaluation_lovely evaluation_amazing evaluation_fine evaluation_uncomfortable]

    index = evaluate.merge({ "5": self.evaluation_uncomfortable }).
              max {|v| v[1] }.
              first.
              to_s.
              to_i

    keyword = keywords[index - 1]
    "#{I18n.t('activerecord.attributes.user.' + keyword)}: #{self[keyword.to_sym]}"
  end

  def full_evaluations
    keywords = %w[evaluation_very_funny evaluation_lovely evaluation_amazing evaluation_fine evaluation_uncomfortable]

    evaluate.merge({ "5": self.evaluation_uncomfortable }).keys.map do |number|
      keyword = keywords[number.to_s.to_i - 1]
      "#{I18n.t('activerecord.attributes.user.' + keyword)}: #{self[keyword.to_sym]}"
    end
  end

  def recent_accesses
    accesses = []
    access_log_read_each do |access_log|
      destination = if access_log.fullpath.match(/\/api\//)
                      if access_log.fullpath.match(/\/payment\//)
                        "Payment"
                      elsif access_log.fullpath.match(/\/signin\.json/)
                        "Sign in"
                      elsif access_log.fullpath.match(/\/signout\.json/)
                        "Sign out"
                      elsif access_log.fullpath.match(/\/conversations\.json.*term=week/)
                        "My page"
                      elsif access_log.fullpath.match(/\/conversations\/calendar\.json/)
                        "Reservation calendar"
                      else
                        "(API)"
                      end
                    elsif access_log.fullpath.match(/\/billing\/[a-z]+\/points\/overview/)
                      "Payment (overview)"
                    elsif access_log.fullpath.match(/\/billing\/[a-z]+\/points/)
                      "Payment"
                    else
                      "(#{access_log.fullpath})"
                    end

      accesses << "#{access_log.created_at.to_s}, #{destination}"
    end
    if accesses.length > 10
      accesses = accesses.slice(accesses.length - 10, 10)
    end
    accesses << "-------------------"
    link = "/admin/user_accesses?utf8=✓&q%5Buser_id_eq%5D=#{self.id}&commit=絞り込む&order=id_desc"
    accesses << "<a href='#{link}'>すべてのアクセスログを見る</a>"
    accesses.join("<br>")
  end

  def registered_at
    created_at.strftime('%Y/%m/%d')
  end
end
