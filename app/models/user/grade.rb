class User < ApplicationRecord
  has_one :users_grade, dependent: :destroy
  delegate :grade, to: :users_grade

  after_create :create_users_grade
end
