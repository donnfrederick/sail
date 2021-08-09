module Analytics
  class MonthlyConversations < MonthlyTerms
    def total_of(section)
      @total_of = terms.map do |term|
        count = HistoryHelper.conversation_ids_in_section(section, term.start_at, term.end_at).count
        term.value = count
        term
      end
    end

    def nhs
      return @nhs if @nhs.present?

      org_ids = Organization.nursing_houses.pluck(:id)
      org_ids.select! {|id| excluded_nh_ids.exclude?(id) }

      @nhs = OrganizationSection.where(organization_id: org_ids).all
    end

    def individual_teachers
      return @individual_teachers if @individual_teachers.present?

      excludes = UsersOrganizationSection.group(:user_id).pluck(:user_id)
      @individual_teachers = Teacher.where.not(id: excludes).all
    end

    def users(section)
      user_ids = UsersOrganizationSection.where(organization_section_id: section.id).pluck(:user_id)
      User.where(id: user_ids).order("id ASC").all
    end

    def users_conversations(user)
      terms.map do |term|
        conversation_ids = Conversation.finished.where("start_at >= ?", term.start_at).where("end_at < ?", term.end_at).pluck(:id)
        count = UsersConversation.where(conversation_id: conversation_ids, user_id: user.id).count
        term.value = count
        term
      end
    end

    def excluded_nh_ids=(nh_ids)
      @excluded_nh_ids = [] unless @excluded_nh_ids.present?
      @excluded_nh_ids += nh_ids
      @excluded_nh_ids.uniq
    end

    def excluded_nh_ids
      @excluded_nh_ids || []
    end
  end
end
