module Analytics
  class UserList

    def individual_teachers
      Teacher.where(organization_device_id: nil).find_each do |teacher|
        if teacher.name_en.present? && teacher.email.present?
          if keyword_blacklist.select {|x| teacher.email.include?(x) }.count === 0
            yield teacher
          end
        end
      end
    end

    private

      def keyword_blacklist
        %w[@. @+ ... helte sail test kayac tni demo example]
      end
  end
end
