# == Schema Information
#
# Table name: materials
#
#  id            :bigint           not null, primary key
#  name          :string(191)      not null
#  url           :text(65535)      not null
#  views         :integer          default(0)
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  admin_user_id :bigint
#
# Indexes
#
#  index_materials_on_admin_user_id  (admin_user_id)
#
class Material < ApplicationRecord
  belongs_to :admin_user

  validates :name, format: /\A[a-z0-9\-]+\z/
  validates :url, format: /\A#{URI::regexp(%w(http https))}\z/

  def self.find_by_name!(name)
    find_by!(name: name)
  end

  def count_up_views!(views = 1)
    self.update!(views: self.views + views)
  end

  def entry_point
    "#{ENV["APP_SERVICE_HOST"]}/materials/#{self.name}"
  end
end
