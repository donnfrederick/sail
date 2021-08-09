# == Schema Information
#
# Table name: users_purposes
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  purpose_id :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_users_purposes_on_purpose_id  (purpose_id)
#  index_users_purposes_on_user_id     (user_id)
#

class UsersPurpose < ApplicationRecord
  belongs_to :purpose
  belongs_to :user
end
