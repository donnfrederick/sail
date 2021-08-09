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

class Student < User
  alias_attribute :name, :name_en
  after_initialize :default_values

  concerned_with :notifications

  validates :name, format: {
                     with: /\A[\w\'\-\.\s]+\Z/i,
                     if: -> { self.name_en && self.name_en_changed? },
                   }

  has_many :visible_conversations, ->(student) { excluded_by_teacher(student.blocks_from_user) }, class_name: "Conversation"

  def default_values
    self.level ||= LEVEL_N3
  end

  # TODO: 将来的には国コードと言語コードのマッピングを行い、
  # 動的に locale を切り替える
  def default_locale
    :en
  end

  # 日本語レベルが高いか（N3 以上）
  def skillful?
    if rated_conversation_level == Student::NOT_SET
      self.level < Student::LEVEL_N4
    else
      rated_conversation_level > Student::ADVANCED
    end
  end

  # 日本語レベルが十分かどうか
  def enough_skillful_for?(teacher)
    teacher.desired_condition != DESIRED_CONDITION_SKILLFUL || self.skillful?
  end

  def reservable_conversations_on(date_on)
    Conversation.reservable_conversations_for(self, date_on)
  end
end
