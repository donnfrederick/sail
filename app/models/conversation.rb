# == Schema Information
#
# Table name: conversations
#
#  id                      :bigint(8)        not null, primary key
#  conversation_request_id :bigint(8)
#  admin_user_id           :bigint(8)
#  status                  :string(191)      not null
#  start_at                :datetime
#  end_at                  :datetime
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  channel_id              :string(255)
#

class Conversation < ApplicationRecord
  concerned_with :block
  concerned_with :broadcast
  concerned_with :recommend
  concerned_with :push_notification
  concerned_with :sora
  concerned_with :ambush_conversation
  concerned_with :video_sessions

  mount_uploader :video, ConversationVideoUploader

  START_OF_WEEK   = :sunday
  DURATION        = 25.minutes
  TOPIC_SIZE      = 3 # 選択できるトークテーマの数

  TERMS = [
    TERM_WEEKLY  = "week".freeze,
    TERM_MONTHLY = "month".freeze,
  ].freeze

  has_many :conversation_requests, dependent: :destroy
  has_many :candidates, through: :conversation_requests, source: :from_user
  has_many :requests, class_name: "ConversationRequest", foreign_key: :conversation_id
  has_many :pended_requests, -> { only_not_rejected.only_not_approved }, class_name: "ConversationRequest", foreign_key: :conversation_id
  has_one :cancelled_conversation
  has_many :point_transactions
  has_many :consumed_point_transactions
  has_many :retrieved_point_transactions
  has_many :chats

  belongs_to :admin_user, optional: true
  belongs_to :teacher
  belongs_to :student, optional: true

  has_many :reservable_conversations, dependent: :destroy

  has_many :video_chunks, -> { order(start_at: :asc) }
  has_many :accusations

  STATUSES = [
    STATUS_WAITING    = "waiting".freeze,    # 空き時間を登録中
    STATUS_QUEUED     = "queued".freeze,     # 開始待ち
    STATUS_PROGRESS   = "progress".freeze,   # 通話中
    STATUS_COMPLETED  = "completed".freeze,  # 正常終了
    STATUS_FAILED     = "failed".freeze,     # 異常終了
    STATUS_CANCELED   = "cancled".freeze,    # キャンセル TODO: スペリングが間違っています。
    STATUS_UNMATCHED  = "unmatched".freeze,  # マッチング不成立
    STATUS_UNKNOWN    = "unknown".freeze,    # ステータス異常
  ].freeze

  # @deprecated 翻訳ファイルを使用してください。
  STATUS_NAMES = {
    STATUS_WAITING   => "空き時間を登録中".freeze,
    STATUS_QUEUED    => "開始待ち".freeze,
    STATUS_PROGRESS  => "通話中".freeze,
    STATUS_COMPLETED => "正常終了".freeze,
    STATUS_FAILED    => "異常終了".freeze,
    STATUS_CANCELED  => "キャンセル".freeze,
    STATUS_UNMATCHED => "マッチング不成立".freeze,
    STATUS_UNKNOWN   => "ステータス異常".freeze,
  }.freeze

  COMPILATION_STATUSES = [
    STATUS_COMP_UNAVAILABLE = nil,                # まだ会話していないか、会話が失敗したかの場合
    STATUS_COMP_ARCHIVED    = "archived".freeze,  # archivesがSoraで生成され、Sailがそのメタ情報だけ受け取った状態
    STATUS_COMP_QUEUED      = "queued".freeze,    # エンコード待ち
    STATUS_COMP_PROGRESS    = "progress".freeze,  # エンコード中
    STATUS_COMP_COMPLETED   = "completed".freeze, # エンコード終了
    STATUS_COMP_FAILED      = "failed".freeze,    # エンコード失敗
    STATUS_COMP_SKIPPED     = "skipped".freeze,   # エンコードがキャンセルされた、または無効化された
  ].freeze

  scope :waiting,   -> { where(status: STATUS_WAITING) }
  scope :queued,    -> { where(status: STATUS_QUEUED) }
  scope :progress,  -> { where(status: STATUS_PROGRESS) }
  scope :completed, -> { where(status: STATUS_COMPLETED) }
  scope :failed,    -> { where(status: STATUS_FAILED) }
  scope :cancled,   -> { where(status: STATUS_CANCELED) }
  scope :matched,   -> { where.not(teacher_id: nil).where.not(student_id: nil) }
  scope :unmatched,   -> { where(status: STATUS_UNMATCHED) }

  scope :scheduled, -> { where(status: [STATUS_QUEUED, STATUS_PROGRESS])}
  scope :opened,    -> { where(status: [STATUS_WAITING, STATUS_QUEUED, STATUS_PROGRESS]) }
  scope :finished,  -> { where(status: [STATUS_COMPLETED, STATUS_FAILED]) }

  scope :archived,  -> { where(compilation_status: STATUS_COMP_ARCHIVED) }
  scope :encoding_queued, -> { where(compilation_status: STATUS_COMP_QUEUED) }
  scope :encoding,    -> { where(compilation_status: STATUS_COMP_PROGRESS) }
  scope :available,   -> { where(compilation_status: STATUS_COMP_COMPLETED) }
  scope :unavailable, -> { where(compilation_status: STATUS_COMP_UNAVAILABLE) }

  scope :current, -> {
    scheduled.where("start_at <= :now AND :now <= end_at", now: Time.zone.now)
  }
  scope :start_at_by_by, ->(start_at) { where("start_at <= ?", start_at) }
  scope :start_at_by, ->(start_at) { where("? <= start_at", start_at) }
  scope :end_at_by, ->(end_at) { where("end_at <= ?", end_at) }
  scope :end_at_since, ->(end_at) { where("end_at >= ?", end_at) }

  scope :start_on_by, ->(start_on) {
    start_at_by(start_on.in_time_zone.beginning_of_day)
  }
  scope :end_on_by, ->(end_on) {
    end_at_by(end_on.in_time_zone.end_of_day)
  }
  scope :weekly_by, ->(page = 1) {
    target_datetime = Time.zone.now + (page.to_i - 1).weeks

    start_at_by(target_datetime.beginning_of_week(START_OF_WEEK)).
      end_at_by(target_datetime.end_of_week(START_OF_WEEK))
  }
  scope :monthly_by, ->(page = 1) {
    target_datetime = Time.zone.now + (page.to_i - 1).months

    start_at_by(target_datetime.beginning_of_month).
      end_at_by(target_datetime.end_of_month)
  }
  scope :since, ->(date_time) { where("start_at > ?", date_time) }
  scope :only_past, -> { where("end_at < ?", Time.now) }

  scope :organization_by, ->(organization) {
    conversation_ids = ::UsersConversation.organization_by(organization).pluck(:conversation_id)
    Conversation.where(id: conversation_ids).all
  }

  scope :teacher_visible, -> { where(teacher_blocks: false) }
  scope :student_visible, -> { where(student_blocks: false) }

  scope :by_teacher_id, ->(teacher_id) { where(teacher_id: teacher_id) }
  scope :by_student_id, ->(student_id) { where(student_id: student_id) }
  scope :excluded_by_teacher, ->(teacher) { where.not(teacher: teacher) }
  scope :excluded_by_student, ->(student) { where.not(student: student) }

  scope :only_accepting_requests, -> { where(accepting_requests: true) }

  scope :only_teacher_absence, -> {
    where(teacher_online_status: nil).
      or(where(teacher_online_status: "Absent"))
  }

  scope :only_student_absence, -> {
    where(student_online_status: nil).
      or(where(student_online_status: "Absent"))
  }

  scope :only_teacher_late, -> {
    where(teacher_online_status: nil).
      or(where(teacher_online_status: "Late"))
  }

  scope :only_student_late, -> {
    where(student_online_status: nil).
      or(where(student_online_status: "Late"))
  }

  scope :only_rated_by_teacher, -> { where(teacher_rated: true) }
  scope :only_rated_by_student, -> { where(student_rated: true) }
  scope :only_unrated_by_teacher, -> { where(teacher_rated: false) }
  scope :only_unrated_by_student, -> { where(student_rated: false) }
  scope :has_teacher_memo, -> { where.not(teacher_memo: nil) }
  scope :has_student_memo, -> { where.not(student_memo: nil) }
  scope :has_teacher_report, -> { where.not(teacher_report: nil) }
  scope :has_student_report, -> { where.not(student_report: nil) }

  scope :only_attended_by_teacher, -> {
    where.not(teacher_online_status: "Absent").
      where.not(teacher_online_status: nil)
  }
  scope :only_attended_by_student, -> {
    where.not(student_online_status: "Absent").
      where.not(student_online_status: nil)
  }

  scope :only_absent_by_teacher, -> {
    where(teacher_online_status: "Absent").
      or(where(teacher_online_status: nil))
  }
  scope :only_absent_by_student, -> {
    where(student_online_status: "Absent").
      or(where(student_online_status: nil))
  }

  scope :rated_or_absent_by_teacher, -> {
    only_rated_by_teacher.or(only_absent_by_teacher)
  }
  scope :rated_or_absent_by_student, -> {
    only_rated_by_student.or(only_absent_by_student)
  }

  scope :sorted, -> { order(start_at: :asc) }
  scope :recently, -> { order(start_at: :desc) }

  validates :start_at, presence: true
  validates :end_at,   presence: true
  validates :teacher_memo, length: { maximum: 1024 }
  validates :student_memo, length: { maximum: 1024 }

  validate :datetime_cannot_be_in_the_past, on: :create
  validate :end_at_cannot_be_greater_than_start_at
  validate :can_not_duplicate_schedules
  validate :can_not_duplicate_schedules_in_device

  after_initialize :default_values
  before_validation :floor_start_at
  before_validation :set_accepting_requests_closed, if: :closed?
  before_save :justify_status
  before_save :set_matched_at,  if: :matching_now?
  after_save  :consume_point!,  if: :matched_now?
  after_save  :close_accept!,   if: :matched_now?
  after_save  :retrieve_point!, if: :cancelled_now?

  def self.finish_timeout
    # 正常に終了した会話
    progress.only_past.each(&:finish)
    # 開始できなかった会話
    queued.only_past.each(&:finish)
  end

  def self.close_waiting_timeout
    ConversationRequestTimeoutService.timeout_all

    # 開始時間までにマッチングしなかった会話
    waiting.end_at_by(Time.now + DURATION).each(&:close_waiting)
  end

  def cancel_by(user_type)
    close_accept!
    cancel_status!
    build_cancelled_conversation.tap do |cc|
      cc.reason = "#{user_type}"
      cc.save!
    end
  end

  def finish
    return unless past?

    broadcast_close

    if self.status_progress?
      service = ConversationFinishService.new self
      service.complete!
    elsif self.status_queued?
      service = ConversationFinishService.new self
      service.fail!
    end
  end

  def finalize_status!
    self.teacher_online_status ||= "Absent"
    self.student_online_status ||= "Absent"
    self.result_status ||= "Not talked"
    self.status = if not_talked?
                    STATUS_FAILED
                  else
                    STATUS_COMPLETED
                  end
    # NOTE: unmatched!と合わせてvalidate: falseにしないでもいいのだろうか
    save!
  end

  def close_waiting
    return unless self.status_waiting?

    service = ConversationFinishService.new self
    service.close!
  end

  def default_values
    self.channel_id ||= SecureRandom.uuid
    self.status     ||= STATUS_WAITING
  end

  # 開始時間を 00分, 30分 に揃える
  def floor_start_at
    if self.start_at_changed?
      self.start_at = if self.start_at.strftime("%M").to_i < 30
                        self.start_at.strftime("%Y-%m-%d %H:00:00%:z").to_datetime
                      else
                        self.start_at.strftime("%Y-%m-%d %H:30:00%:z").to_datetime
                      end
    end
    self.end_at ||= self.start_at.try(:since, DURATION)
  end

  def status_name(locale: nil)
    locale = I18n.locale if locale.nil?
    I18n.t("conversation.status.#{self.status}", default: nil, locale: locale) || I18n.t("conversation.status.unknown", locale: locale)
  end

  def common_topics
    hobbies1, hobbies2 = users.map(&:hobbies)

    results = []
    results |= hobbies1 & hobbies2
    results |= ((hobbies1 + hobbies2).uniq - results).shuffle
    results |= (Hobby.all - results).shuffle

    results.first(TOPIC_SIZE)
  end

  def status_waiting?
    self.status == STATUS_WAITING
  end

  def status_queued?
    self.status == STATUS_QUEUED
  end

  def status_progress?
    self.status == STATUS_PROGRESS
  end

  def status_cancelled?
    self.status == STATUS_CANCELED
  end

  def status_completed?
    self.status == STATUS_COMPLETED
  end

  def status_failed?
    self.status == STATUS_FAILED
  end

  def status_unmatched?
    self.status == STATUS_UNMATCHED
  end

  def status_unknown?
    self.status == STATUS_UNKNOWN
  end

  def talked?
    self.result_status == "Talked"
  end

  def not_talked?
    self.result_status == "Not talked"
  end

  def past?
    self.end_at < Time.now
  end

  def blocked?
    # @deprecated Accusation is no longer used
    return true if self.accusations.exists?

    self.teacher.present? && self.student.present? && (self.teacher.blocks?(self.student) || self.student.blocks?(self.teacher))
  end

  def users
    [self.teacher, self.student].select(&:present?)
  end

  def closed?
    status_cancelled? || status_completed? || status_failed?
  end

  def current?
    started? && !past?
  end

  def started?
    self.start_at < Time.now
  end

  def last_conversation?
    #時間帯予約のみ：30分基準なのは、時間帯予約の場合end_atの値が25分区切りではなく、３０分毎になるため。
    if multiple_conversation?
      self.end_at - 30.minutes < Time.now
    else
      self.end_at - 25.minutes < Time.now
    end
  end

  def multiple_conversation?
    DURATION != self.end_at - self.start_at
  end

  def any_today?
    users.select {|u| self.today?(u) }.count > 0
  end

  def today?(user)
    start_at = self.start_at.in_time_zone(user.timezone).beginning_of_day
    end_at = start_at.end_of_day
    now = Time.now.in_time_zone(user.timezone)
    start_at <= now && now <= end_at
  end

  def failed_because_of?(user_type)
    user_type_2 = %w[teacher student].reject {|c| c == "#{user_type}" }.first
    absent?(user_type) && !absent?(user_type_2)
  end

  def absent?(user_type = nil)
    if user_type.nil?
      absent?(:teacher) || absent?(:student)
    else
      send("#{user_type}_online_status") == "Absent"
    end
  end

  def starts_between?(start_at_, end_at_ = nil)
    end_at_ ||= start_at_ + DURATION
    self.start_at <= start_at_ && self.end_at >= end_at_
  end

  def finish_accepting_requests
    update(accepting_requests: false) if self.accepting_requests?
  end

  def duplicated_schedules
    return @duplicated_schedules if @duplicated_schedules.present?
    return unless self.start_at_changed? || self.student_id_changed?

    teachers_validator = ConversationValidator.new self, self.teacher
    teachers_duplicates = teachers_validator.duplicates
    if teachers_duplicates.present?
      start_at_s = teachers_duplicates.first
      start_at = Time.parse(start_at_s)
      errors[:base] << I18n.t("errors.conversation.duplicate_schedule")
      @duplicated_schedules = {
        text: I18n.t("errors.conversation.duplicate_schedule_at", start_at: start_at),
        start_at: start_at,
        end_at: start_at + 25.minutes,
      }
    elsif self.student.present?
      students_validator = ConversationValidator.new self, self.student
      students_duplicates = students_validator.duplicates
      if students_duplicates.present?
        start_at_s = students_duplicates.first
        start_at = Time.parse(start_at_s)
        errors[:base] << I18n.t("errors.conversation.duplicate_schedule")
        @duplicated_schedules = {
          text: I18n.t("errors.conversation.duplicate_schedule_at", start_at: start_at),
          start_at: start_at,
          end_at: start_at + 25.minutes,
        }
      end
    end

    @duplicated_schedules
  end

  def appear!(user_type)
    if self.send("#{user_type}_online_status").nil?
      attrs = {}
      attrs["#{user_type}_online_status".to_sym] = punctuality_service.status
      update!(attrs)
    end
  end

  def progress!
    appear!(:teacher)
    appear!(:student)

    if absent?(:teacher) && absent?(:student)
      update!(teacher_online_status: "Late", student_online_status: "Late", result_status: "Talked", status: STATUS_PROGRESS)
    elsif absent?(:teacher)
      update!(teacher_online_status: "Late", result_status: "Talked", status: STATUS_PROGRESS)
    elsif absent?(:student)
      update!(student_online_status: "Late", result_status: "Talked", status: STATUS_PROGRESS)
    else
      update!(result_status: "Talked", status: STATUS_PROGRESS)
    end
  end

  def completed!
    update(status: STATUS_COMPLETED, result_status: "Talked")
  end

  def unmatched!
    self.status = STATUS_UNMATCHED
    self.teacher_online_status = nil
    self.teacher_rated = false
    self.student_online_status = nil
    self.student_rated = false
    self.result_status = "Unmatched"
    # NOTE: validate: falseでないといけない理由はこのメソッドのスコープ内では見当たらない
    save!(validate: false)
  end

  private

    def cancel_status!
      update!(deleted_at: Time.now, status: STATUS_CANCELED, accepting_requests: false)
    end

    def close_accept!
      reservable_conversations.destroy_all
      pended_requests.map(&:reject!)
    end

    def matching_now?
      self.will_save_change_to_status? && self.status_queued?
    end

    def matched_now?
      self.saved_change_to_status? && self.status_queued?
    end

    def cancelled_now?
      self.saved_change_to_status? && self.status_cancelled?
    end

    # 過去の日付は追加できない
    def datetime_cannot_be_in_the_past
      return unless self.start_at_changed?

      if start_at.present? && start_at < Time.zone.now
        errors[:base] << I18n.t("errors.conversation.past_date")
      end
      if end_at.present? && end_at < Time.zone.now
        errors[:base] << I18n.t("errors.conversation.past_date")
      end
    end

    # start_at よりも end_at が大きくなければならない
    def end_at_cannot_be_greater_than_start_at
      if end_at <= start_at
        errors[:base] << I18n.t("errors.conversation.less_than_start_at")
      end
    end

    # 同じ時間帯の予約を重複させることはできない
    def can_not_duplicate_schedules
      duplicated_schedules
    end

    # 同端末を利用しているユーザー間で予約を重複させることはできない
    def can_not_duplicate_schedules_in_device
      return unless self.start_at_changed?

      device = self.try(:teacher).try(:organization_device)

      return if device.nil?

      # 同端末ユーザーの予約時間を取得
      reserved_times = []
      conversations = Conversation.opened.by_teacher_id(device.users.map(&:id))
      conversations.each do |conversation|
        next if conversation.id == self.id

        reserved_times |= Conversation.starting_times(conversation.start_at, conversation.end_at)
      end
      # これから予約しようとしている時間帯
      new_times = Conversation.starting_times(start_at, end_at)

      if (new_times & reserved_times).present?
        errors[:base] << I18n.t("errors.conversation.duplicate_schedule_in_device")
      end
    end

    def justify_status
      if self.id.present?
        if %w[Ontime Late].include?(self.teacher_online_status) && %w[Ontime Late].include?(self.student_online_status)
          self.status = STATUS_PROGRESS if self.start_at <= Time.now && self.end_at >= Time.now
        end
      else
        self.status = if self.teacher_id.present? && self.student_id.present?
                        STATUS_QUEUED
                      else
                        STATUS_WAITING
                      end
      end
    end

    def set_matched_at
      self.matched_at ||= Time.now
    end

    def set_accepting_requests_closed
      self.accepting_requests = false
    end

    def consume_point!
      return if self.accepting_requests_before_last_save
      return unless self.admin_user.nil?

      issue = student.available_issues.oldest.first
      return if issue.try(:unlimited?)

      consumed_point_transactions.build.tap do |p|
        p.issue = issue
        p.save!
      end
    end

    def retrieve_point!
      return unless self.saved_change_to_status? && self.status_cancelled?
      return unless consumed_point_transactions.available.exists?

      retrieved_point_transactions.create!
    end

    def punctuality_service
      ConversationPunctuality.new self
    end
end
