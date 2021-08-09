# == Schema Information
#
# Table name: hobbies
#
#  id         :bigint(8)        not null, primary key
#  scope      :string(191)
#  name_ja    :string(191)
#  name_en    :string(191)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Hobby < ApplicationRecord
  include LocalName

  has_many :users_hobbies
  has_many :users, through: :users_hobbies

  SCOPES = [
    SCOPE_ALL = nil,
    SCOPE_TEACHER = "Teacher".freeze,
    SCOPE_STUDENT = "Student".freeze,
  ].freeze

  # OPTIMIZE: 項目が確定したら hobbies.position などでソートする
  NAME_EN_ORDERS = %w(Cooking Reading Sports History Music Travel Art Society Philosophy)
  scope :default_order, -> {
    fields = NAME_EN_ORDERS.map{|x| "'#{x}'" }.join(',')
    order(Arel.sql("FIELD(name_en, #{fields})"))
  }
  scope :by_teacher, -> { where(scope: [SCOPE_ALL, SCOPE_TEACHER]).default_order }
  scope :by_student, -> { where(scope: [SCOPE_ALL, SCOPE_STUDENT]).default_order }

  def name(locale: nil)
    local_name(locale: locale)
  end
end
