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
