# == Schema Information
#
# Table name: users_hobbies
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  hobby_id   :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_users_hobbies_on_hobby_id  (hobby_id)
#  index_users_hobbies_on_user_id   (user_id)
#

class UsersHobby < ApplicationRecord
  belongs_to :hobby
  belongs_to :user
end
