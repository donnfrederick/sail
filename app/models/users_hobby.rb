# == Schema Information
#
# Table name: users_hobbies
#
#  id         :bigint(8)        not null, primary key
#  user_id    :bigint(8)
#  hobby_id   :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UsersHobby < ApplicationRecord
  belongs_to :hobby
  belongs_to :user
end
