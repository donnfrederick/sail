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

class User < ApplicationRecord
  acts_as_paranoid

  TYPE_TEACHER = 'Teacher'
  TYPE_STUDENT = 'Student'

  include Redis::Objects
  include SingleValidator
  include LocalName
  include PasswordReset
  include PhoneNumber

  concerned_with :access_log
  concerned_with :aggregate
  concerned_with :authenticate
  concerned_with :billing
  concerned_with :coupon_owner
  concerned_with :evaluate
  concerned_with :flexible_attributes
  concerned_with :locale
  concerned_with :notifications
  concerned_with :grade
  concerned_with :score
  concerned_with :user_relationship

  mount_uploader :picture, UserPictureUploader

  # for redis
  value :is_online
  value :last_readed_at_value

  value :notify_absence
  value :notify_new_conversation

  value :access_log_value

  has_secure_token :web_socket_token

  has_many :accesses, class_name: "UserAccess"
  has_many :chats
  has_many :users_organization_sections
  has_many :organization_sections, through: :users_organization_sections
  has_many :organizations, through: :organization_sections
  belongs_to :organization_device, optional: true

  has_many :users_conversations
  has_many :conversations, through: :users_conversations

  has_many :teachers_conversations, class_name: "Conversation", foreign_key: "teacher_id"
  has_many :students_conversations, class_name: "Conversation", foreign_key: "student_id"

  has_many :reservable_conversations, dependent: :destroy
  has_many :conversation_requests, class_name: "ConversationRequest", foreign_key: "from_user_id", dependent: :destroy

  has_many :users_hobbies
  has_many :hobbies, through: :users_hobbies

  has_many :users_purposes
  has_many :purposes, through: :users_purposes

  has_many :users_coupons
  has_many :coupons, through: :users_coupons

  has_many :block_from_user, class_name: "::Block", foreign_key: "from_user_id", dependent: :destroy
  has_many :block_to_user,   class_name: "::Block", foreign_key: "to_user_id",   dependent: :destroy
  has_many :blocks_from_user, through: :block_from_user, source: "to_user"
  has_many :blocks_to_user,   through: :block_to_user,   source: "from_user"

  has_many :favorite_from_user, class_name: "::Favorite", foreign_key: "from_user_id", dependent: :destroy
  has_many :favorite_to_user,   class_name: "::Favorite", foreign_key: "to_user_id",   dependent: :destroy
  has_many :favorites_from_user, through: :favorite_from_user, source: "to_user"
  has_many :favorites_to_user,   through: :favorite_to_user,   source: "from_user"

  has_many :pairs_from, class_name: "::Pair", foreign_key: "from_user_id"
  has_many :pairs_to, class_name: "::Pair", foreign_key: "to_user_id"
  has_many :pair_from_user, class_name: "::Pair", foreign_key: "from_user_id", dependent: :destroy
  has_many :pair_to_user,   class_name: "::Pair", foreign_key: "to_user_id",   dependent: :destroy
  has_many :pairs_from_user, through: :pair_from_user, source: "to_user"
  has_many :pairs_to_user,   through: :pair_to_user,   source: "from_user"

  accepts_nested_attributes_for :hobbies, :purposes, allow_destroy: true, update_only: true, reject_if: :all_blank

  scope :statistics, -> { where(statistics: true) }

  delegate :follow_up!,   to: :pair_follow_up_create_service, prefix: false
  delegate :unfollow_up!, to: :pair_follow_up_remove_service, prefix: false
  delegate :privilege!,   to: :privilege_service, prefix: false
  delegate :unprivilege!, to: :unprivilege_service, prefix: false
  delegate :invalid_as_foreigner!,   :invalid_as_ridiculous!,   to: :user_set_invalid_service, prefix: false
  delegate :valid_as_not_foreigner!, :valid_as_not_ridiculous!, to: :user_unset_invalid_service, prefix: false
  delegate :append!, :read_each, :clear!, to: :access_log, prefix: true

  # ISO 5218 - Codes for the representation of human sexes
  SEXES = [
    SEX_UNKNOWN    = 0, # 不明
    SEX_MALE       = 1, # 男性
    SEX_FEMALE     = 2, # 女性
    SEX_APPLICABLE = 9, # 適用不能
  ].freeze

  # for ActiveAdmin
  SEX_NAMES = {
    SEX_UNKNOWN    => "未登録".freeze,
    SEX_MALE       => "男性".freeze,
    SEX_FEMALE     => "女性".freeze,
    SEX_APPLICABLE => "適用不能".freeze,
  }.freeze

  SEX_NAMES_EN = {
    SEX_UNKNOWN    => "Not Registered".freeze,
    SEX_MALE       => "Male".freeze,
    SEX_FEMALE     => "Female".freeze,
    SEX_APPLICABLE => "Not Applicable".freeze,
  }.freeze

  DESIRED_CONDITIONS = [
    DESIRED_CONDITION_SKILLFUL   = 1,
    DESIRED_CONDITION_UNSKILLFUL = 2,
  ].freeze

  # for ActiveAdmin
  DESIRED_CONDITION_NAMES = {
    DESIRED_CONDITION_SKILLFUL   => "日本語が得意なほうが良い".freeze,
    DESIRED_CONDITION_UNSKILLFUL => "日本語が不得意でも構わない".freeze,
  }.freeze

  CONVERSATION_LEVELS = [
    NOT_SET = 0,
    BASIC = 1,
    BEGINNER = 2,
    INTERMEDIATE = 3,
    ADVANCED = 4,
    EXPERT = 5
  ].freeze

  LEVELS = [
    LEVEL_HAVE_NEVER_TAKEN = -10,
    LEVEL_HAVE_NEVER_PASSED = -1,
    LEVEL_N1 = 1,
    LEVEL_N2 = 2,
    LEVEL_N3 = 3,
    LEVEL_N4 = 4,
    LEVEL_N5 = 5,
  ].freeze

  attr_encrypted :email,    key: ENV["ENCRYPT_KEY_USER_EMAIL"],
                            mode: :single_iv_and_salt,
                            insecure_mode: true,
                            encode: true
  attr_encrypted :uid,      key: ENV["ENCRYPT_KEY_USER_UID"],
                            mode: :single_iv_and_salt,
                            insecure_mode: true,
                            encode: true
  attr_encrypted :birthday, key: ENV["ENCRYPT_KEY_USER_BIRTHDAY"],
                            mode: :single_iv_and_salt,
                            insecure_mode: true,
                            encode: true

  scope :only_highly_reliable, -> { where(highly_reliable: true) }

  scope :by_email, ->(email) {
    where(encrypted_email: User.encrypt_email(email))
  }

  scope :by_email_with_downcase, ->(email) {
    by_email(email.strip.downcase)
  }

  scope :by_uid, ->(uid) {
    where(encrypted_uid: User.encrypt_uid(uid))
  }

  scope :by_teachers, -> { where(type: TYPE_TEACHER) }
  scope :by_students, -> { where(type: TYPE_STUDENT) }

  validates :name, presence: true,
                   length: { maximum: 61 }

  validates :email, presence: true,
                    length: { maximum: 125 }

  validates :sex, inclusion: { in: SEXES }

  validates :country, presence: true,
                      inclusion: {
                        in: ISO3166::Country.all_names_with_codes.map(&:last),
                      }

  validates :timezone, presence: true,
                       inclusion: {
                         in: TZInfo::Timezone.all_identifiers,
                       }

  validates :conversation_level, presence: true,
                    inclusion: { in: CONVERSATION_LEVELS },
                    if: -> { self.student? }

  validates :level, presence: true,
                    inclusion: { in: LEVELS },
                    if: -> { self.student? }

  validates :desired_condition, presence: true,
                                inclusion: { in: DESIRED_CONDITIONS },
                                if: -> { self.teacher? }

  validates :phone_number, allow_nil: true, phone_format: true,
            if: -> { self.phone_number.present? }

  before_save :set_email_downcase
  before_save :cleanup_duplicated_fcm_tokens

  after_save :set_timezone
  after_save :join_organization_section, if: -> { self.organization_device_id.present? && self.organization_device_id_changed? }

  def suspicious!
    update(suspicious: true)
  end

  def unsuspicious!
    update(suspicious: false)
  end

  def set_email_downcase
    # 新規登録時のみ
    self.email = email.strip.downcase if self.try(:created_at).nil?
  end

  def set_timezone
    Time.zone = self.timezone if self.try(:timezone).present?
  end

  def timezone_name(locale: nil)
    locale = I18n.locale if locale.nil?
    short_name = Time.now.in_time_zone(self.timezone).strftime("%Z")

    country_codes = TZInfo::Country.all_codes.select do |code|
      country = TZInfo::Country.get(code)
      country.zone_identifiers.include?(self.timezone)
    end

    country = country_codes.empty? ? "GMT" : TZInfo::Country.get(country_codes.first)

    I18n.t("time.zone.#{short_name}", default: nil, locale: locale, country: country) || I18n.t("time.zone.other", locale: locale, country: country)
  end

  def sex_name
    names = %w[unknown male female]
    names[self.sex] || "other"
  end

  def picture_url
    picture.url || "/assets/img/common/user@3x.png"
  end

  # for ActiveAdmin filter
  def self.ransackable_scopes(_auth_object = nil)
    %i(by_email_with_downcase)
  end

  # user.is_online is redis-objects
  # OPTIMIZE: オンライン時に実行する操作を非同期にするべき
  def appear
    self.is_online = "1"

    conversation = current_conversation

    if conversation.present? && !conversation.blocked?
      # 進行中の会話がある場合、通話開始を通知
      conversation.broadcast_channel(:open)
    else
      notify
    end

    self
  end

  # user.is_online is redis-objects
  def disappear
    self.is_online.delete
    self
  end

  # お知らせがある場合は通知する
  def notify
    # 現在会話中でない場合のみ通知処理を実行する
    unless current_conversation.present?
      # 無断欠席のお知らせポップアップを表示
      unless self.notify_absence.nil?
        Notification.broadcast_absence(self)
        self.disable_notify_absence
      end

      # 通話予約が確定した際にポップアップを表示（シニアのみ）
      unless self.notify_new_conversation.nil?
        conversation = Conversation.where(id: self.notify_new_conversation.value).first
        Notification.broadcast_matching(conversation) if conversation
        self.disable_notify_new_conversation
      end
    end
  end

  def update_last_readed_at
    self.last_readed_at_value = Time.zone.now.iso8601
  end

  def last_readed_at
    self.last_readed_at_value.nil? ? nil : self.last_readed_at_value.to_datetime
  end

  # お知らせの未読件数
  def unread_count
    Notification.unread_count(self)
  end

  # 次回オンライン時に警告を通知する
  def enable_notify_absence
    self.notify_absence = "1"
  end

  # 警告の通知を無効にする
  def disable_notify_absence
    self.notify_absence.delete
  end

  # 次回オンライン時に新しい会話を通知する
  # お知らせは1会話のみ表示し、新しい conversation_id に上書きする
  def enable_notify_new_conversation(conversation_id)
    self.notify_new_conversation = conversation_id.to_s
  end

  # 新しい会話の通知を無効にする
  def disable_notify_new_conversation
    self.notify_new_conversation.delete
  end

  # 新しい会話の conversation_id
  def notify_new_conversation_id
    self.notify_new_conversation.nil? ? nil : self.notify_new_conversation.value.to_i
  end

  # user.is_online is redis-objects
  def online?
    # self.is_online.value.present?
  end

  def ban?
    #ban対象者はuser[:id]==1のユーザーのみマッチングする
    self.pairs_from.size == 1 && self.pairs_from.first.to_user_id == 1
  end

  def teacher?
    self.type == TYPE_TEACHER
  end

  def student?
    self.type == TYPE_STUDENT
  end

  def conversations
    if teacher?
      teachers_conversations
    else
      students_conversations
    end
  end

  # 今現在、進行中の会話
  def current_conversation
    conversations.current.first
  end

  def conversation_experiences
    conversations.finished.count
  end

  def conversation_experiences_with(partner)
    if partner.teacher?
      conversations.by_student_id(partner.id).finished.count
    elsif partner.student?
      conversations.by_teacher_id(partner.id).finished.count
    else
      0
    end
  end

  def favorite_users_recent_conversations
    favorites_from_user.limit(5).
      map{|user| user.conversations.matched.recently.first }.
      select(&:present?)
  end

  # 同端末で現在オンラインのユーザー
  def online_device_user
    device_users = organization_device.try(:users) || []
    device_users.find(&:online?)
  end

  # 端末に紐付いたユーザーか
  def belongs_to_device?
    self.organization_device_id.present?
  end

  # 利用端末のFCM登録トークンを取得
  def device_fcm_token
    belongs_to_device? ? self.organization_device.try(:organization_staff).try(:fcm_token) : nil
  end

  def location
    organizations.try(:first).try(:location)
  end

  # どちらか一方がブロックしているユーザーID
  def block_user_ids
    (blocks_from_user.pluck(:id) + blocks_to_user.pluck(:id) + Pair.blocker_ids(self.id)).uniq
  end

  # 予約可能な日付を取得
  def enable_dates(start_on, end_on)
    # システム上の予約不可な日付
    disable_dates = Settings.conversations.disable_dates

    start_at, end_at = if start_on.in_time_zone.to_date == Time.zone.now.to_date
                         [
                           Time.zone.now,
                           end_on.in_time_zone.end_of_day,
                         ]
                       else
                         [
                           start_on.in_time_zone.beginning_of_day,
                           end_on.in_time_zone.end_of_day,
                         ]
                       end

    enable_dates = if teacher?
                     # Teacher: 予約不可以外の日
                     (start_on..end_on).select do |d|
                       disable_dates.exclude? d.to_date.strftime("%Y-%m-%d")
                     end
                   else
                     # Student: マッチング待ちの相手がいる日
                     Conversation.
                       reservable_conversations_at(self, start_at, end_at).
                       map {|rc| rc.conversation.try(&:start_at) }
                   end

    enable_dates.map(&:in_time_zone).map(&:to_date)
  end

  # 自分が予約済の日付を取得
  def reserved_dates(start_on, end_on)
    # conversations.opened.start_on_by(start_on).end_on_by(end_on).pluck(:start_at)
    start_at, end_at = if start_on.in_time_zone.to_date == Time.zone.now.to_date
                         [
                           Time.zone.now,
                           end_on.in_time_zone.end_of_day
                         ]
                       else
                         [
                           start_on.in_time_zone.beginning_of_day,
                           end_on.in_time_zone.end_of_day
                         ]
                       end
    conversations.opened.start_at_by(start_at).end_at_by(end_at).pluck(:start_at)
  end

  def last_accessed_at
    last_created_at = nil
    access_log_read_each do |access_log|
      last_created_at = access_log.created_at
    end
    last_created_at || self.accesses.recently.first
  end

  # ユーザーのタイムゾーンでの時間
  def local_time_expr(time, type = :short)
    user_zone = self.try(:timezone).present? ? self.timezone : "UTC"
    I18n.l(time.in_time_zone(user_zone), locale: self.default_locale, format: type)
  end

  # WARNING: 該当するFCMトークンを持つユーザーが同一デバイスではない可能性を下記は考慮していません。
  def cleanup_duplicated_fcm_tokens(new_fcm_token = nil)
    needle = new_fcm_token || self.fcm_token
    return if needle.nil?

    User
      .where(fcm_token: needle)
      .where.not(id: self.id)
      .update_all(fcm_token: nil)
  end

  def update_fcm_token(fcm_token)
    cleanup_duplicated_fcm_tokens(fcm_token)
    update(fcm_token: fcm_token)
  end

  def tutor?
    organization_sections.only_tutors.exists?
  end

  def has_bad_experiences?(count)
    last_conversations = conversations.finished.recently.limit(count)
    fully_experiences = last_conversations.count == count
    no_success = last_conversations.present? && last_conversations.select(&:status_completed?).empty?
    good_attitude = last_conversations.select {|c| c.absent?(type.downcase) }.empty?
    fully_experiences && no_success && good_attitude
  end

  def has_good_experiences?(count)
    last_conversations = conversations.finished.recently.limit(count)
    fully_experiences = last_conversations.count == count
    no_failure = last_conversations.select(&:status_failed?).empty?
    fully_experiences && no_failure
  end

  def serial_absent?(count)
    conversations.finished.recently.limit(count).reject {|c| c.absent?(type.downcase) }.empty?
  end

  private

    def access_log
      RedisUserAccessLog.new self
    end

    def pair_follow_up_create_service
      PairFollowUpCreateService.new(self)
    end

    def pair_follow_up_remove_service
      PairFollowUpRemoveService.new(self)
    end

    def privilege_service
      PrivilegeService.new(self)
    end

    def unprivilege_service
      PrivilegeDestroyService.new(self)
    end

    def user_set_invalid_service
      UserSetInvalidService.new(self)
    end

    def user_unset_invalid_service
      UserUnsetInvalidService.new(self)
    end

    def join_organization_section
      if organization_sections.exclude? organization_device.organization_section
        self.organization_sections << organization_device.organization_section
      end
    end
end
