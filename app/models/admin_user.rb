# == Schema Information
#
# Table name: admin_users
#
#  id              :bigint           not null, primary key
#  email           :string(191)
#  lang            :string(3)        default("ja")
#  last_sign_in_at :datetime
#  last_sign_in_ip :string(191)
#  provider        :string(191)
#  role            :string(191)
#  timezone        :string(191)      default("Asia/Tokyo")
#  uid             :string(191)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_admin_users_on_provider_and_uid  (provider,uid) UNIQUE
#

class AdminUser < ApplicationRecord
  attr_accessor :encrypted_password
  devise :database_authenticatable, :omniauthable

  ROLE_ADMIN = 'admin'

  ROLES = {
    ROLE_ADMIN => '管理者',
  }


  has_many :notifications
  has_many :conversations

  validates :email,    presence: true

  # for ActiveAdmin
  def role_name
    ROLES[role]
  end

  # Devise override to ignore the password requirement if the user is authenticated with Google
  def password_required?
    provider.present? ? false : super
  end

  def self.from_omniauth(auth)
    admin_user = where(email: auth.info.email).first || where(auth.slice(:provider, :uid)).first
    if admin_user.present?
      admin_user.update_attributes provider: auth.provider,
                                   uid:      auth.uid,
                                   email:    auth.info.email
    end
    admin_user
  end
end
