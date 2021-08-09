class OrganizationStaffMailer < ApplicationMailer
  default from: Settings.email_address.sail

  def password_reset(staff)
    @staff = staff

    logger.debug { "\n\n\nPASSWORD_RESET_URL:\n#{@staff.password_reset_url}\n\n\n" }

    mail(
      to:      @staff.email,
      subject: "Change password | Sail"
    )
  end
end
