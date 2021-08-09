module Organizations
  module OrganizationSectionHelper
    def current_organization_sections
      @current_staff.organization.organization_sections
    end

    def available_seats
      @current_staff.organization.name_kana.to_i + OrganizationSectionIssue.where(user: @current_staff.organization.users.where(type: 'Student')).sum(:conversations)
    end
  end
end
