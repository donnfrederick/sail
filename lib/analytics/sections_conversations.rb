module Analytics
  class SectionsConversations < Statistics

    def columns
      name_columns = nursing_house_sections.map(&:name_ja)
      name_columns << ""
      name_columns << "(Individuals)"
      name_columns << "Total"
    end

    def data_at(start_at, end_at)
      each_count = each_conversation_count(start_at, end_at)
      data_columns = each_count.clone
      data_columns << ""
      data_columns << individual_conversation_count(start_at, end_at)
      data_columns << each_count.sum

      data_columns
    end

    private

      def nursing_houses
        @nursing_houses ||= Organization.
          nursing_houses.
          statistics.
          all.
          order(id: :asc)
      end

      def nursing_house_sections
        @nursing_house_sections ||= OrganizationSection.
          statistics.
          where(organization_id: nursing_houses.map(&:id)).
          all.
          order("organization_id ASC, id ASC")
      end

      def individual_teachers
        @individual_teachers ||= Teacher.statistics.where(organization_device_id: nil).all
      end

      def each_conversation_count(start_at, end_at)
        nursing_house_sections.map do |section|
          user_ids = []
          section.organization_devices.each do |device|
            user_ids += device.users.map(&:id)
          end
          Conversation.
            start_at_by(start_at).
            end_at_by(end_at).
            by_teacher_id(user_ids).
            finished.
            count
        end
      end

      def individual_conversation_count(start_at, end_at)
        Conversation.
          start_at_by(start_at).
          end_at_by(end_at).
          by_teacher_id(individual_teachers.map(&:id)).
          finished.
          count
      end
  end
end
