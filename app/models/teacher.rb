# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  organization_device_id :bigint(8)
#  type                   :string(191)
#  provider               :string(191)
#  encrypted_uid          :string(191)
#  auth_token             :string(191)
#  username               :string(191)
#  name_ja                :string(191)
#  name_en                :string(191)
#  sex                    :integer          default(0)
#  timezone               :string(191)
#  encrypted_email        :string(191)
#  password_digest        :string(191)
#  encrypted_birthday     :string(191)
#  activation_digest      :string(191)
#  is_activated           :boolean
#  activated_at           :datetime
#  activation_sent_at     :datetime
#  password_reset_digest  :string(191)
#  password_reset_sent_at :datetime
#  deleted_at             :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  desired_condition      :integer
#  country                :string(191)
#  level                  :integer
#  picture                :string(191)
#  web_socket_token       :string(191)
#  evaluate               :integer          default(3), not null
#  lateness               :integer          default(0), not null
#

class Teacher < User
  DEFAULT_COUNTRY = "JP".freeze
  DEFAULT_TIMEZONE = "Asia/Tokyo".freeze

  concerned_with :notifications

  alias_attribute :name, :name_ja
  after_initialize  :default_values
  before_validation :translate_name, on: [:create, :update]

  has_many :visible_conversations, ->(teacher)  { excluded_by_student(teacher.blocks_from_user) }, class_name: "Conversation"

  # 一応カタカナ入力でも受け付けて変換するようにしておく
  validates :name, format: {
                     with: /\A[ぁ-んァ-ンー－\s]+\Z/,
                     message: I18n.t("errors.messages.format_with_hiragana"),
                     if: -> { self.name_ja_changed? },
                   }

  def default_values
    self.country  ||= DEFAULT_COUNTRY
    self.timezone ||= DEFAULT_TIMEZONE
    self.desired_condition ||= DESIRED_CONDITION_SKILLFUL
  end

  # 日本語名をローマ字に変換する
  def translate_name
    if self.name_ja_changed?
      self.name_ja = self.name_ja.to_s.to_hira
      self.name_en = self.name_ja.to_s.split(' ').map{|x| x.to_roman.capitalize }.reverse.join(' ')
    end
  end

  def default_locale
    :ja
  end

  def all_devices
    @devices = OrganizationDevice.in_section(@current_section.id).all
  end
end
