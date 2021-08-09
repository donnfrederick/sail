module LocalName
  extend ActiveSupport::Concern

  def local_name(locale: nil)
    locale = I18n.locale if locale.nil?

    if has_attribute? "name_#{locale}"
      self.try(:send, "name_#{locale}")
    else
      self.try(:send, "name_#{I18n.default_locale}")
    end
  end
end
