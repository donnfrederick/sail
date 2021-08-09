class OrganizationSectionIssue < Issue
  def organization_section
    OrganizationSection.find_by(id: self.data_id)
  end
end
