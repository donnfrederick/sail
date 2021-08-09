class OrganizationStaff
  def assign_new_password(current_password, password, password_confirmation = nil)
    return self if current_password.blank?

    unless authenticate(current_password)
      errors[:base] << I18n.t("errors.authentication")
      return
    end

    self.password = password
    self.password_confirmation = password_confirmation

    self
  end
end
