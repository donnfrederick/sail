module Requests
  module UserHelpers
    def create_teacher
      create :teacher, hobbies: Hobby.all.first(3), purposes: Purpose.all.first(3)
    end

    def create_student
      create :student, hobbies: Hobby.all.first(3), purposes: Purpose.all.first(3)
    end
  end
end
