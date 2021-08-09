# == Schema Information
#
# Table name: purposes
#
#  id         :bigint(8)        not null, primary key
#  scope      :string(191)
#  name_ja    :string(191)
#  name_en    :string(191)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Purpose < ApplicationRecord
  has_many :users_purposes
  has_many :users, through: :users_purposes

  SCOPES = [
    SCOPE_ALL = nil,
    SCOPE_TEACHER = "Teacher".freeze,
    SCOPE_STUDENT = "Student".freeze,
  ].freeze

  scope :by_teacher, -> { where(scope: [SCOPE_ALL, SCOPE_TEACHER]) }
  scope :by_student, -> { where(scope: [SCOPE_ALL, SCOPE_STUDENT]) }

  def name
    if has_attribute? "name_#{I18n.locale}"
      self.try(:send, "name_#{I18n.locale}")
    else
      self.try(:send, "name_#{I18n.default_locale}")
    end
  end
end
