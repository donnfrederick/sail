# == Schema Information
#
# Table name: users_purposes
#
#  id         :bigint(8)        not null, primary key
#  user_id    :bigint(8)
#  purpose_id :bigint(8)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UsersPurpose < ApplicationRecord
  belongs_to :purpose
  belongs_to :user
end
