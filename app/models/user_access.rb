class UserAccess < ApplicationRecord
  belongs_to :user

  scope :app_accesses, -> {
    where("user_agent LIKE ?", "%sail/iOS%")
      .or(where("user_agent LIKE ?", "%sail/Android%"))
  }
  scope :recently, -> { order(created_at: :asc) }
end
