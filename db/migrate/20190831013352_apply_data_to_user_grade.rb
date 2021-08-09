class ApplyDataToUserGrade < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    User.find_each do |user|
      if user.users_grade.nil?
        UsersGrade.create(user_id: user.id)
      end
    end
  end
end
