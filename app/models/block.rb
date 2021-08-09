# == Schema Information
#
# Table name: blocks
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  from_user_id :bigint
#  to_user_id   :bigint
#
# Indexes
#
#  index_blocks_on_from_user_id  (from_user_id)
#  index_blocks_on_to_user_id    (to_user_id)
#
class Block < ApplicationRecord
  belongs_to :from_user, class_name: "User", foreign_key: "from_user_id"
  belongs_to :to_user,   class_name: "User", foreign_key: "to_user_id"

  # TODO 名前要検討
  scope :by_from_user, ->(user) {
    where(from_user_id: user.id)
  }

  # TODO 名前要検討
  scope :by_to_user, ->(user) {
    where(to_user_id: user.id)
  }

  validates :to_user, uniqueness: { scope: :from_user }
end
