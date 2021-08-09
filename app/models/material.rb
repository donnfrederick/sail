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
