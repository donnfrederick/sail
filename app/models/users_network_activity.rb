# == Schema Information
#
# Table name: users_network_activities
#
#  id         :bigint           not null, primary key
#  type       :string(191)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_users_network_activities_on_type     (type)
#  index_users_network_activities_on_user_id  (user_id)
#
class UsersNetworkActivity < ApplicationRecord
  # TODO 本当は純粋にサイトに現れた場合にONLINE/OFFLINEを使いたいが、今はビデオ通話に出たかどうかに使っているので使い分けれる名前にすべき
  TYPE_ONLINE  = "Online" # オンラインになった
  TYPE_OFFLINE = "Offline" # オフラインになった

  scope :by_user, ->(user) {
    where(user_id: user.id)
  }

  scope :only_online, -> {
    where(type: TYPE_ONLINE)
  }

  scope :only_offline, -> {
    where(type: TYPE_OFFLINE)
  }

  scope :since, ->(time) {
    where("created_at >= ?", time)
  }

  scope :by, ->(time) {
    where("created_at < ?", time)
  }

  # TODO 名前がおかしい
  scope :order_later, -> {
    order("created_at DESC")
  }

  # TODO 名前がおかしい
  scope :order_earlier, -> {
    order("created_at ASC")
  }

  def online?
    self.type == TYPE_ONLINE
  end

  def offline?
    self.type == TYPE_OFFLINE
  end
end
