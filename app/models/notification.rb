# == Schema Information
#
# Table name: notifications
#
#  id                    :bigint(8)        not null, primary key
#  admin_user_id         :bigint(8)
#  notificated_at        :datetime
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  user_id               :integer
#  scope                 :string(191)
#  title_ja              :string(191)
#  title_en              :string(191)
#  body_ja               :text(65535)
#  body_en               :text(65535)
#  organization_staff_id :integer
#

class Notification < ApplicationRecord
  belongs_to :admin_user,   optional: true
  belongs_to :user,         optional: true
  belongs_to :related_user, class_name: 'User', foreign_key: 'related_user_id', optional: true
  belongs_to :conversation, optional: true

  # organization_staffによる投稿のお知らせのもの
  belongs_to :organization_staff, optional: true

  concerned_with :conversation_partner
  concerned_with :google_analytics

  EXPIRY_TIME = 1.month.freeze

  SCOPES = [
    SCOPE_ALL        = nil,
    SCOPE_STUDENTS   = "students".freeze,
    SCOPE_TEACHERS   = "teachers".freeze,
    SCOPE_INDIVIDUAL = "individual".freeze,
  ].freeze

  # for ActiveAdmin
  SELECT_SCOPES = {
    SCOPE_ALL      => "全ユーザー".freeze,
    SCOPE_STUDENTS => "日本語学習者".freeze,
    SCOPE_TEACHERS => "日本人".freeze,
    SCOPE_INDIVIDUAL => "個人ユーザー".freeze,
  }.freeze

  TYPE = [
    HELTE = 0.freeze,
    CONVERSATION_ARRANGEMENT = 1.freeze,
    CONVERSATION_REMINDER = 2.freeze,
    CONVERSATION_CANCELLATION = 3.freeze,
  ].freeze

  nilify_blanks only: [:scope]

  scope :user_by, ->(user) {
    individual_condition = where(scope: SCOPE_INDIVIDUAL, user_id: user.id)

    group_condition = case user.type
                      when User::TYPE_TEACHER then where(scope: [SCOPE_ALL, SCOPE_TEACHERS])
                      when User::TYPE_STUDENT then where(scope: [SCOPE_ALL, SCOPE_STUDENTS])
                      else none
                      end
    group_condition = group_condition.or(individual_condition)

    user.users_organization_sections.each do |users_org_section|
      scope = "section-" + users_org_section.organization_section_id.to_s
      group_condition = group_condition.or(where(scope: scope))
    end

    group_condition
  }

  # organization_staffによる投稿のお知らせのもの
  scope :editable, -> { where("scope like 'section-%'") }

  scope :by_related_user, ->(related_user) { where(related_user: related_user) }

  scope :by_section, ->(section) {
    individual_condition = where(scope: SCOPE_INDIVIDUAL, user_id: section.users.map(&:id))

    group_condition = case section.organization.industry
                      when Organization::INDUSTRY_UNIVERSITY    then where(scope: [SCOPE_ALL, SCOPE_TEACHERS])
                      when Organization::INDUSTRY_NURSING_HOUSE then where(scope: [SCOPE_ALL, SCOPE_STUDENTS])
                      else none
                      end

    sections = section.is_a?(Array) ? section : [section]
    sections.each do |s|
      group_condition = group_condition.or(where(scope: "section-#{s.id}"))
    end

    group_condition.or(individual_condition)
  }

  scope :by_user, ->(user) {
    users = user.is_a?(Array) ? user : [user]
    group_condition = where(user: users.pop)
    users.each do |u|
      group_condition = group_condition.or(where(user: u))
    end

    group_condition
  }

  scope :by_conversation_id, ->(conversation_id) { where(conversation_id: conversation_id) }

  scope :by_now, -> { where("notificated_at <= ?", Time.zone.now) }
  scope :published, -> { sent.by_now.where.not(notificated_at: nil) }
  scope :recently,  -> { order("notificated_at DESC").where.not(notificated_at: nil) }

  scope :overall,    -> { where(scope: SCOPE_ALL) }
  scope :teachers,   -> { where(scope: SCOPE_TEACHERS) }
  scope :students,   -> { where(scope: SCOPE_STUDENTS) }
  scope :individual, -> { where(scope: SCOPE_INDIVIDUAL) }
  scope :organizations, -> { where("scope like ?", "section-%") }

  scope :available, -> { where(deleted_at: nil) }
  scope :sent, ->(is_sent = true) { where(sent: is_sent) }

  validates :notification_type,  presence: true,
                                 inclusion: { in: TYPE }

  def self.nullify_all
    update_all(deleted_at: Time.now)
  end

  # for ActiveAdmin
  def scope_name
    SELECT_SCOPES[scope]
  end

  # お知らせの未読件数
  # 厳密な未読管理は行わず、直近7日以内 &&
  # 最終既読日時よりも新しいお知らせの件数を取得する
  def self.unread_count(user)
    last_readed_at = [user.last_readed_at, 7.days.ago].compact.max
    user_by(user).published.where("notificated_at > ?", last_readed_at).count
  end

  def title(locale: nil)
    locale = I18n.locale if locale.nil?

    if has_attribute? "title_#{locale}"
      self.try(:send, "title_#{locale}")
    else
      self.try(:send, "title_#{I18n.default_locale}")
    end
  end

  def body(locale: nil)
    locale = I18n.locale if locale.nil?

    if has_attribute? "body_#{locale}"
      self.try(:send, "body_#{locale}")
    else
      self.try(:send, "body_#{I18n.default_locale}")
    end
  end

  def image_url
    if self.scope == SCOPE_INDIVIDUAL
      conversation_partner_picture_url || user.try(:picture_url)
    elsif section?
      organization_staff.organization.try(:picture_url)
    else
      "/assets/img/common/notification-official.png"
    end
  end

  def conversation_partner_picture_url
    return nil unless conversation && user

    partner = (conversation.users - [user]).first
    partner.try(:picture_url)
  end

  # scope=section-*だけ
  def section?
    self.scope.present? && self.scope.include?("section-")
  end

  def target_section_id
    digits = self.scope.split("-")
    return nil unless digits[1].present?

    digits[1].to_i
  end

  # scope=section-*だけ
  def target_section_id=(section_id)
    self.scope = "section-" + section_id.to_s
  end

  def target_section
    OrganizationSection.find_by(id: target_section_id)
  end

  def target_section=(organization_section)
    self.target_section_id = organization_section.id
  end

  def mentions_about?(user)
    if conversation.present?
      conversation.users.include? user
    else
      false
    end
  end

  def url
    "#{ENV["APP_SERVICE_HOST"]}/#{user.type.downcase}s/notifications/#{self.id}"
  end

  def mailer
    if user.nil?
      nil
    elsif self.template.nil?
      NotificationMailer.send("unread_message_#{user.default_locale}", user, self)
    elsif user.teacher?
      TeacherMailer.send(self.template, user, self)
    elsif user.student?
      StudentMailer.send(self.template, user, self)
    end
  end

  def self.notify_follow_up_next_reservation(conversation, user_type)
    teacher = conversation.teacher
    student = conversation.student
    create(
      user_id: conversation.send(user_type),
      scope: SCOPE_INDIVIDUAL,
      title_ja:   I18n.t("notification.follow_up_next_reservation.title", locale: teacher.default_locale),
      title_en:   I18n.t("notification.follow_up_next_reservation.title", locale: teacher.default_locale),
      body_ja: I18n.t("notification.follow_up_next_reservation.body", locale: teacher.default_locale, user_name: student.name_en),
      body_en: I18n.t("notification.follow_up_next_reservation.body", locale: teacher.default_locale, user_name: student.name_en),
      notificated_at: Time.now,
      notification_type: HELTE,
    )
  end

  def self.notify_follow_up_next_reservation_with_sorry(conversation, user_type)
    teacher = conversation.teacher
    student = conversation.student
    create(
      user_id: conversation.send(user_type),
      scope: SCOPE_INDIVIDUAL,
      title_ja:   I18n.t("notification.follow_up_next_reservation_with_sorry.title", locale: teacher.default_locale),
      title_en:   I18n.t("notification.follow_up_next_reservation_with_sorry.title", locale: teacher.default_locale),
      body_ja: I18n.t("notification.follow_up_next_reservation_with_sorry.body", locale: teacher.default_locale, user_name: student.name_en),
      body_en: I18n.t("notification.follow_up_next_reservation_with_sorry.body", locale: teacher.default_locale, user_name: student.name_en),
      notificated_at: Time.now,
      notification_type: HELTE,
      )
  end

  def self.notify_follow_up_removed(followed_up_user)
    create(
      user_id: followed_up_user.id,
      scope: SCOPE_INDIVIDUAL,
      title_ja: I18n.t("notification.removed_followed_up.title", locale: followed_up_user.default_locale),
      title_en: I18n.t("notification.removed_followed_up.title", locale: followed_up_user.default_locale),
      body_ja: I18n.t("notification.removed_followed_up.body", locale: followed_up_user.default_locale),
      body_en: I18n.t("notification.removed_followed_up.body", locale: followed_up_user.default_locale),
      notificated_at: Time.now,
      notification_type: HELTE,
      )
  end

  def self.notify_absence_warned(suspicious_user)
    create(
      notificated_at: Time.now,
      user_id: suspicious_user.id,
      sent: true,
      title_ja: "",
      title_en: I18n.t("notification.warn_absence.title", locale: "en"),
      body_ja: "",
      body_en: I18n.t("notification.warn_absence.body", locale: "en"),
      scope: SCOPE_INDIVIDUAL,
      )
  end

  def self.notify_conversation_matched(conversation)
    return if conversation.status_waiting?

    conversation.users.each do |user|
      partner = (conversation.users - [user]).first
      your_name = user.try(:send, "name_#{user.default_locale}")
      start_at = user.local_time_expr(conversation.start_at, :at)
      start_on = user.local_time_expr(conversation.start_at, :date)
      timezone = user.timezone_name(locale: user.default_locale)
      create(
        notificated_at:     Time.zone.now,
        sent:               user.student?,
        user_id:            user.id,
        conversation_id:    conversation.id,
        scope:              SCOPE_INDIVIDUAL,
        title_ja:           I18n.t("notification.conversation_matching.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        title_en:           I18n.t("notification.conversation_matching.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        body_ja:            I18n.t("notification.conversation_matching.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        body_en:            I18n.t("notification.conversation_matching.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        notification_type:  CONVERSATION_ARRANGEMENT,
      )

      # 次回オンライン時にマッチング通知
      user.enable_notify_new_conversation(conversation.id) if user.teacher?
    end
  end

  def self.notify_conversation_cancelled(conversation, culprit_user, notify_both = true)
    return if conversation.student.nil?

    is_another_day = !conversation.any_today?
    conversation.users.each do |user|
      is_culprit = culprit_user.try(:id) == user.id
      next if is_culprit && notify_both == false

      partner = (conversation.users - [user]).first
      your_name = user.try(:send, "name_#{user.default_locale}")
      start_at = user.local_time_expr(conversation.start_at, :at)
      start_on = user.local_time_expr(conversation.start_at, :date)
      timezone = user.timezone_name(locale: user.default_locale)
      title_slug, body_slug = if is_another_day
                                %w[
                                  notification.conversation_canceled.title
                                  notification.conversation_canceled.body
                                ]
                              elsif is_culprit
                                %w[
                                  notification.conversation_canceled_today_culprit.title
                                  notification.conversation_canceled_today_culprit.body
                                ]
                              else
                                %w[
                                  notification.conversation_canceled_today.title
                                  notification.conversation_canceled_today.body
                                ]
                              end
      create(
        notificated_at:     Time.zone.now,
        user_id:            user.id,
        conversation_id:    conversation.id,
        scope:              SCOPE_INDIVIDUAL,
        title_ja:           I18n.t(title_slug, locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        title_en:           I18n.t(title_slug, locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        body_ja:            I18n.t(body_slug,  locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        body_en:            I18n.t(body_slug,  locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        notification_type:  CONVERSATION_CANCELLATION,
      )

      # マッチング通知を削除
      user.disable_notify_new_conversation if user.notify_new_conversation_id == conversation.id
    end
  end

  def self.notify_conversation_cancelled_by_admin(conversation)
    return if conversation.student.nil?

    is_another_day = !conversation.any_today?
    conversation.users.each do |user|

      partner = (conversation.users - [user]).first
      your_name = user.try(:send, "name_#{user.default_locale}")
      start_at = user.local_time_expr(conversation.start_at, :at)
      start_on = user.local_time_expr(conversation.start_at, :date)
      timezone = user.timezone_name(locale: user.default_locale)
      title_slug, body_slug = if is_another_day
                                %w[
                                  notification.conversation_canceled.title
                                  notification.conversation_canceled.body
                                ]
                              else
                                %w[
                                  notification.conversation_canceled_today.title
                                  notification.conversation_canceled_today.body
                                ]
                              end
      create(
        notificated_at:     Time.zone.now,
        user_id:            user.id,
        conversation_id:    conversation.id,
        scope:              SCOPE_INDIVIDUAL,
        title_ja:           I18n.t(title_slug, locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        title_en:           I18n.t(title_slug, locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        body_ja:            I18n.t(body_slug,  locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        body_en:            I18n.t(body_slug,  locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
        notification_type:  CONVERSATION_CANCELLATION,
        )

      # マッチング通知を削除
      user.disable_notify_new_conversation if user.notify_new_conversation_id == conversation.id
    end
  end

  def self.notify_remind_1day_ago
    start_at = Time.zone.now + 1.day
    conversations = Conversation.queued.where(start_at: (start_at-1.minutes)..(start_at+1.minutes))

    conversations.each do |conversation|
      conversation.users.each do |user|
        partner = (conversation.users - [user]).first
        your_name = user.try(:send, "name_#{user.default_locale}")
        start_at = user.local_time_expr(conversation.start_at, :at)
        start_on = user.local_time_expr(conversation.start_at, :date)
        timezone = user.timezone_name(locale: user.default_locale)
        body_ja = I18n.t("notification.remind_1day_ago.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone)
        body_en = I18n.t("notification.remind_1day_ago.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone)
        next if where(user_id: user.id, conversation_id: conversation.id, body_ja: body_ja, body_en: body_en).exists?

        create(
          notificated_at:     Time.zone.now,
          user_id:            user.id,
          conversation_id:    conversation.id,
          scope:              SCOPE_INDIVIDUAL,
          title_ja:           I18n.t("notification.remind_1day_ago.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
          title_en:           I18n.t("notification.remind_1day_ago.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
          body_ja:            body_ja,
          body_en:            body_en,
          notification_type:  CONVERSATION_ARRANGEMENT,
        )
      end
    end
  end

  def self.notify_remind_1hour_ago
    start_at = Time.zone.now + 1.hour
    conversations = Conversation.queued.where(start_at: (start_at-1.minutes)..(start_at+1.minutes))

    conversations.each do |conversation|
      conversation.users.each do |user|
        partner = (conversation.users - [user]).first
        your_name = user.try(:send, "name_#{user.default_locale}")
        start_at = user.local_time_expr(conversation.start_at, :at)
        start_on = user.local_time_expr(conversation.start_at, :date)
        timezone = user.timezone_name(locale: user.default_locale)
        body_ja = I18n.t("notification.remind_1hour_ago.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone)
        body_en = I18n.t("notification.remind_1hour_ago.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone)
        next if where(user_id: user.id, conversation_id: conversation.id, body_ja: body_ja, body_en: body_en).exists?

        create(
          notificated_at:     Time.zone.now,
          user_id:            user.id,
          conversation_id:    conversation.id,
          scope:              SCOPE_INDIVIDUAL,
          title_ja:           I18n.t("notification.remind_1hour_ago.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
          title_en:           I18n.t("notification.remind_1hour_ago.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
          body_ja:            body_ja,
          body_en:            body_en,
          notification_type:  CONVERSATION_REMINDER,
        )
      end
    end
  end

  def self.notify_remind_10minutes_ago
    start_at = Time.zone.now + 10.minutes
    conversations = Conversation.queued.where(start_at: (start_at-1.minutes)..(start_at+1.minutes))

    conversations.each do |conversation|
      conversation.users.each do |user|
        partner = (conversation.users - [user]).first
        your_name = user.try(:send, "name_#{user.default_locale}")
        start_at = user.local_time_expr(conversation.start_at, :at)
        start_on = user.local_time_expr(conversation.start_at, :date)
        timezone = user.timezone_name(locale: user.default_locale)
        body_ja = I18n.t("notification.remind_10minutes_ago.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone)
        body_en = I18n.t("notification.remind_10minutes_ago.body", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone)
        next if where(user_id: user.id, conversation_id: conversation.id, body_ja: body_ja, body_en: body_en).exists?

        create(
          notificated_at:     Time.zone.now,
          user_id:            user.id,
          conversation_id:    conversation.id,
          scope:              SCOPE_INDIVIDUAL,
          title_ja:           I18n.t("notification.remind_10minutes_ago.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on),
          title_en:           I18n.t("notification.remind_10minutes_ago.title", locale: user.default_locale, user_name: partner.name_en, your_name: your_name, start_at: start_at, start_on: start_on),
          body_ja:            body_ja,
          body_en:            body_en,
          notification_type:  CONVERSATION_REMINDER,
        )
      end
    end
  end

  # 30日以上経過した通知を削除する
  def self.cleanup_old_notifications
    notifications = where(scope: SCOPE_INDIVIDUAL).
      where("notificated_at < ?", Time.zone.now - EXPIRY_TIME)
    notifications.delete_all
  end

  # WebSocket を通じたポップアップ通知

  # 無断欠席のお知らせポップアップを表示
  def self.broadcast_absence(user)
    I18n.locale = user.default_locale

    body = {
      channel: "ConversationsChannel",
      action:  :notify_absence,
      user:    UserSerializer.new(user).to_hash,
    }

    ConversationsChannel.broadcast_to user, body
  end

  # 通話予約が確定した際にポップアップを表示（teacherのみ）
  def self.broadcast_matching(conversation)
    I18n.locale = conversation.teacher.default_locale

    body = {
      channel:      "ConversationsChannel",
      action:       :notify_matching,
      conversation: ConversationSerializer.new(conversation).to_hash,
    }

    ConversationsChannel.broadcast_to conversation.teacher, body
  end

  def self.notify_request_created(conversation_request)
    teacher = conversation_request.conversation.teacher
    student = conversation_request.from_user
    start_at = conversation_request.start_at
    start_on = teacher.local_time_expr(start_at, :date)
    start_at_s = teacher.local_time_expr(start_at, :at)
    timezone = teacher.timezone_name(locale: teacher.default_locale)
    create(
      user_id: teacher.id,
      scope: SCOPE_INDIVIDUAL,
      title_ja: I18n.t("notification.new_request.title", locale: teacher.default_locale, start_at: start_at_s, start_on: start_on, user_name: student.name_en),
      title_en: I18n.t("notification.new_request.title", locale: student.default_locale, start_at: start_at_s, start_on: start_on, user_name: student.name_en),
      body_ja: I18n.t("notification.new_request.body", locale: teacher.default_locale, start_at: start_at_s, start_on: start_on, user_name: student.name_en, timezone: timezone),
      body_en: I18n.t("notification.new_request.body", locale: student.default_locale, start_at: start_at_s, start_on: start_on, user_name: student.name_en, timezone: timezone),
      notificated_at: Time.now,
      notification_type: CONVERSATION_ARRANGEMENT,
      )
  end

  # 予約リクエストがキャンセルされたときの通知
  def self.notify_request_rejected(conversation_request)
    student = conversation_request.from_user
    teacher = conversation_request.conversation.teacher
    start_at = student.local_time_expr(conversation_request.start_at, :at)
    start_on = student.local_time_expr(conversation_request.start_at, :date)
    timezone = student.timezone_name(locale: student.default_locale)
    create(
      user_id: student.id,
      scope: SCOPE_INDIVIDUAL,
      title_ja: I18n.t("notification.request_rejected.title", locale: teacher.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_ja, timezone: timezone),
      title_en: I18n.t("notification.request_rejected.title", locale: student.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_en, timezone: timezone),
      body_ja: I18n.t("notification.request_rejected.body", locale: teacher.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_ja, timezone: timezone),
      body_en: I18n.t("notification.request_rejected.body", locale: student.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_en, timezone: timezone),
      notificated_at: Time.now,
      notification_type: CONVERSATION_ARRANGEMENT,
    )
  end

  def self.notify_request_cancelled(conversation_request)
    conversation = conversation_request.conversation
    teacher = conversation_request.conversation.teacher
    student = conversation_request.from_user
    start_on = student.local_time_expr(conversation_request.start_at, :date)
    start_at = student.local_time_expr(conversation_request.start_at, :at)
    timezone = teacher.timezone_name(locale: teacher.default_locale)
    create(
      notificated_at:  Time.zone.now,
      user_id:         conversation.teacher_id,
      conversation_id: conversation.id,
      scope:           SCOPE_INDIVIDUAL,
      title_ja: I18n.t("notification.request_cancelled.title", locale: teacher.default_locale, start_at: start_at, start_on: start_on, user_name: student.name_en),
      title_en: I18n.t("notification.request_cancelled.title", start_at: start_at, start_on: start_on, user_name: student.name_en),
      body_ja: I18n.t("notification.request_cancelled.body", locale: teacher.default_locale, start_at: start_at, start_on: start_on, user_name: student.name_en, timezone: timezone),
      body_en: I18n.t("notification.request_cancelled.body", start_at: start_at, start_on: start_on, user_name: student.name_en, timezone: timezone),
      notification_type:  CONVERSATION_ARRANGEMENT,
      )
  end

  def self.notify_request_approved(conversation_request)
    student = conversation_request.from_user
    teacher = conversation_request.conversation.teacher
    start_at = student.local_time_expr(conversation_request.start_at, :at)
    start_on = student.local_time_expr(conversation_request.start_at, :date)
    timezone = student.timezone_name(locale: student.default_locale)
    create(
      user_id: student.id,
      scope: SCOPE_INDIVIDUAL,
      title_ja: I18n.t("notification.request_approved.title", locale: teacher.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_ja, timezone: timezone),
      title_en: I18n.t("notification.request_approved.title", locale: student.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_en, timezone: timezone),
      body_ja: I18n.t("notification.request_approved.body", locale: teacher.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_ja, timezone: timezone),
      body_en: I18n.t("notification.request_approved.body", locale: student.default_locale, start_at: start_at, start_on: start_on, user_name: teacher.name_en, timezone: timezone),
      notificated_at: Time.now,
      notification_type: CONVERSATION_ARRANGEMENT,
      )
  end

  def self.notify_conversation_with_request_cancelled_to_teacher(conversation_request)
    conversation = conversation_request.conversation
    student = conversation_request.from_user
    teacher = conversation_request.conversation.teacher
    your_name = teacher.try(:send, "name_#{teacher.default_locale}")
    start_at = teacher.local_time_expr(conversation.start_at, :at)
    start_on = teacher.local_time_expr(conversation.start_at, :date)
    timezone = teacher.timezone_name(locale: teacher.default_locale)
    title_slug, body_slug = if conversation.any_today?
                              %w[
                                  notification.conversation_canceled_today_culprit.title
                                  notification.conversation_canceled_today_culprit.body
                                ]
                            else
                              %w[
                                  notification.conversation_canceled.title
                                  notification.conversation_canceled.body
                                ]
                            end

    if teacher.notify_new_conversation_id == conversation.id
      teacher.disable_notify_new_conversation
    end

    create(
      notificated_at:     Time.zone.now,
      user_id:            teacher.id,
      conversation_id:    conversation.id,
      scope:              SCOPE_INDIVIDUAL,
      title_ja:           I18n.t(title_slug, locale: teacher.default_locale, user_name: student.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      title_en:           I18n.t(title_slug, locale: teacher.default_locale, user_name: student.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      body_ja:            I18n.t(body_slug,  locale: teacher.default_locale, user_name: student.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      body_en:            I18n.t(body_slug,  locale: teacher.default_locale, user_name: student.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      notification_type:  CONVERSATION_CANCELLATION,
      )
  end


  def self.notify_conversation_with_request_cancelled(conversation_request)
    conversation = conversation_request.conversation
    student = conversation_request.from_user
    teacher = conversation_request.conversation.teacher
    your_name = student.try(:send, "name_#{student.default_locale}")
    start_at = student.local_time_expr(conversation.start_at, :at)
    start_on = student.local_time_expr(conversation.start_at, :date)
    timezone = student.timezone_name(locale: student.default_locale)
    title_slug, body_slug = if conversation.any_today?
                              %w[
                                  notification.conversation_canceled_today.title
                                  notification.conversation_canceled_today.body
                                ]
                            else
                              %w[
                                  notification.conversation_canceled.title
                                  notification.conversation_canceled.body
                                ]
                            end

    if student.notify_new_conversation_id == conversation.id
      student.disable_notify_new_conversation
    end

    create(
      notificated_at:     Time.zone.now,
      user_id:            student.id,
      conversation_id:    conversation.id,
      scope:              SCOPE_INDIVIDUAL,
      title_ja:           I18n.t(title_slug, locale: student.default_locale, user_name: teacher.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      title_en:           I18n.t(title_slug, locale: student.default_locale, user_name: teacher.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      body_ja:            I18n.t(body_slug,  locale: student.default_locale, user_name: teacher.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      body_en:            I18n.t(body_slug,  locale: student.default_locale, user_name: teacher.name_en, your_name: your_name, start_at: start_at, start_on: start_on, timezone: timezone),
      notification_type:  CONVERSATION_CANCELLATION,
      )
  end

  def self.notify_conversation_reopened(conversation, student)
    teacher = conversation.teacher
    start_on = student.local_time_expr(conversation.start_at, :date)
    start_at = student.local_time_expr(conversation.start_at, :at)
    timezone = student.timezone_name(locale: student.default_locale)
    create(
      notificated_at: Time.now,
      user_id: student.id,
      scope: SCOPE_INDIVIDUAL,
      title_ja: "",
      title_en: I18n.t("notification.conversation_restored.title", locale: student.default_locale, user_name: teacher.name_en, your_name: student.name_en, start_at: start_at, start_on: start_on, timezone: timezone),
      body_ja: "",
      body_en: I18n.t("notification.conversation_restored.body", locale: student.default_locale, user_name: teacher.name_en, your_name: student.name_en, start_at: start_at, start_on: start_on, timezone: timezone),
      notification_type: HELTE,
      )
  end

  def self.notify_conversation_points_retrieved_because_of_absence(conversation, culprit_user_type)
    culprit = conversation.send(culprit_user_type)
    victim = if culprit.teacher?
                conversation.student
              else
                conversation.teacher
              end
    start_on = victim.local_time_expr(conversation.start_at, :date)
    start_at = victim.local_time_expr(conversation.start_at, :at)
    timezone = victim.timezone_name(locale: victim.default_locale)
    create(
      notificated_at: Time.now,
      user_id: victim.id,
      scope: SCOPE_INDIVIDUAL,
      title_ja: I18n.t("notification.conversation_points_retrieved_because_of_absence.title", locale: victim.default_locale, user_name: culprit.name_en, your_name: victim.name_en, start_at: start_at, start_on: start_on, timezone: timezone),
      title_en: I18n.t("notification.conversation_points_retrieved_because_of_absence.title", locale: victim.default_locale, user_name: culprit.name_en, your_name: victim.name_en, start_at: start_at, start_on: start_on, timezone: timezone),
      body_ja: I18n.t("notification.conversation_points_retrieved_because_of_absence.body", locale: victim.default_locale, user_name: culprit.name_en, your_name: victim.name_en, start_at: start_at, start_on: start_on, timezone: timezone),
      body_en: I18n.t("notification.conversation_points_retrieved_because_of_absence.body", locale: victim.default_locale, user_name: culprit.name_en, your_name: victim.name_en, start_at: start_at, start_on: start_on, timezone: timezone),
      notification_type: HELTE,
      )
  end
end
