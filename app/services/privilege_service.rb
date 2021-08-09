class PrivilegeService < ApplicationService
  attr_reader :privileged_user

  def initialize(privileged_user)
    @privileged_user = privileged_user
  end

  def privilege!
    find_reliable_users.map(&:id).each do |opposite_user_id|
      unless Pair.where({ from_user_id: privileged_user.id, to_user_id: opposite_user_id }).exists?
        Pair.create({ from_user_id: privileged_user.id, to_user_id: opposite_user_id, manual: false, follow_up: false })
      end
    end
  end

  private

    def find_reliable_users
      if privileged_user.teacher?
        Student.only_highly_reliable.all
      elsif privileged_user.student?
        whole_ids = OrganizationSection.nursing_houses.pluck(:id)
        teacher_tutor_user_ids = UsersOrganizationSection.
            only_tutors.
            where(organization_section_id: whole_ids).
            pluck(:user_id).uniq
        Teacher.where(id: teacher_tutor_user_ids).all
      else
        []
      end
    end
end
