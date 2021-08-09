# == Schema Information
#
# Table name: user_accesses
#
#  id         :bigint           not null, primary key
#  fullpath   :string(191)
#  user_agent :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_accesses_on_user_id  (user_id)
#
class UserAccess < ApplicationRecord
  belongs_to :user

  scope :app_accesses, -> {
    where("user_agent LIKE ?", "%sail/iOS%")
      .or(where("user_agent LIKE ?", "%sail/Android%"))
  }
  scope :recently, -> { order(created_at: :asc) }
end
