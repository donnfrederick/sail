module Requests
  module FixtureHelpers
    def create_hobbies
      hobbies = YAML.load_file(Rails.root.join('db/datasources/hobbies.yml'))
      hobbies.each do |hobby_attributes|
        Hobby.find_or_create_by(hobby_attributes)
      end
      Hobby.all
    end

    def create_purposes
      purposes = YAML.load_file(Rails.root.join('db/datasources/purposes.yml'))
      purposes.each do |purpose_attributes|
        Purpose.find_or_create_by(purpose_attributes)
      end
      Purpose.all
    end

    def create_conversations_with_memo(user)
      user_is_teacher = user.teacher?
      1.upto((3..10).to_a.sample) do |_i|
        random_partner = if user_is_teacher
                           FactoryBot.create(:student)
                         else
                           FactoryBot.create(:teacher)
                         end
        FactoryBot.create(
          :conversation,
          :skip_validate,
          teacher: user_is_teacher ? user : random_partner,
          student: user_is_teacher ? random_partner : user,
          teacher_memo: "teacherが書いたメモ",
          student_memo: "studentが書いたメモ",
        )
      end
    end
  end
end
