class PairFollowUpCreateService < ApplicationService
  attr_reader :target_user

  def initialize(target_user)
    @target_user = target_user
  end

  def follow_up!(admin_only: false)
    user_ids = if target_user.teacher?
                 student_tutor_user_ids(admin_only: admin_only).empty? ? [1] : student_tutor_user_ids(admin_only: admin_only)
               else
                 teacher_tutor_user_ids(admin_only: admin_only).empty? ? [1] : teacher_tutor_user_ids(admin_only: admin_only)
               end
    new_pairs = []
    user_ids.each do |tutor_user_id|
      data = { from_user_id: target_user.id, to_user_id: tutor_user_id, manual: false, follow_up: true }
      new_pairs << Pair.new(data) unless Pair.where(data).exists?
    end

    Pair.import new_pairs
  end

  private

    def teacher_tutor_user_ids(admin_only: false)
      whole_ids = OrganizationSection.nursing_houses.pluck(:id)
      if admin_only
        selected_ids = SiteConfig.find_by_keyword("teacher.admin.organization_section_ids", "1").split(",").map(&:to_i)
        UsersOrganizationSection.
          where(organization_section_id: selected_ids).
          where(organization_section_id: whole_ids).
          pluck(:user_id).uniq
      else
        UsersOrganizationSection.
          only_tutors.
          where(organization_section_id: whole_ids).
          pluck(:user_id).uniq
      end
    end

    def student_tutor_user_ids(admin_only: false)
      student_ids = Student.only_highly_reliable.pluck(:id)
      whole_ids = OrganizationSection.universities.pluck(:id)
      if admin_only
        selected_ids = SiteConfig.find_by_keyword("student.admin.organization_section_ids", "2").split(",").map(&:to_i)
        UsersOrganizationSection.
          where(user_id: student_ids).
          where(organization_section_id: selected_ids).
          where(organization_section_id: whole_ids).
          pluck(:user_id).uniq
      else
        student_ids
      end
    end
end
