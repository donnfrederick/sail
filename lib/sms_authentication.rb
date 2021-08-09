class SmsAuthentication
  attr_reader :phone_authentication, :locale

  def initialize(phone_authentication, locale = "en")
    @phone_authentication = phone_authentication
    @locale = locale
  end

  def send_code
    client = Twilio::REST::Client.new(twilio_account_sid, twilio_auth_token)
    client.api.account.messages.create(
      from: twilio_sms_phone_number,
      to: phone_authentication.full_phone_number,
      body: authentication_body
    )
  rescue Twilio::REST::RestError => e
    case e.code
    when 21211
      raise UserError.new I18n.t("errors.sms_authentication.invalid", locale: locale)
    when 	21612
      raise UserError.new I18n.t("errors.sms_authentication.unsupported", locale: locale)
    when 	21408
      raise UserError.new I18n.t("errors.sms_authentication.restricted", locale: locale, phone_number: twilio_sms_phone_number)
    when 	21610
      raise UserError.new I18n.t("errors.sms_authentication.banned", locale: locale)
    when 	21614
      raise UserError.new I18n.t("errors.sms_authentication.incapable", locale: locale)
    else
      raise e
    end
  end

  private

    def twilio_account_sid
      @twilio_account_sid ||= ENV["TWILIO_ACOCUNT_SID"] || SiteConfig.find_by_keyword!("sms_authentication.twilio.account_sid")
    end

    def twilio_auth_token
      @twilio_auth_token ||= ENV["TWILIO_AUTH_TOKEN"] || SiteConfig.find_by_keyword!("sms_authentication.twilio.auth_token")
    end

    def twilio_sms_phone_number
      @twilio_sms_phone_number ||= ENV["TWILIO_SMS_AUTH_PHONE_NUMBER"] || SiteConfig.find_by_keyword!("sms_authentication.twilio.sms_phone_number")
    end

    def authentication_body
      I18n.t("sms_authentication.body", locale: locale, code: phone_authentication.code)
    end
end
