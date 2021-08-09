class PhoneFormatValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if record.try(:phone_number).nil? || record.try(:full_phone_number).nil?

    phone = record.full_phone_number
    unless phone.match(/\A\+[0-9]{1,3}[1-9][0-9]{7,9}\z/)
      record.errors.add(attribute, I18n.t("errors.user.invalid_phone_number"))
    end
  end
end