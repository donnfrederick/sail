class MonthlyConversationReportPdf < Prawn::Document
  attr_reader :organization_device, :start_at, :end_at, :timezone

  def initialize(organization_device_id, year, month)
    super(
      page_size: "A4",
      top_margin: 40,
      bottom_margin: 30,
      left_margin: 40,
      right_margin: 40
    )

    pdf_setup

    # TODO organization_deviceから安全に追えるDB上のtimezoneフィールドがないためいったんハードコーディング
    @organization_device = OrganizationDevice.find_by(id: organization_device_id)
    @timezone = "Asia/Tokyo"
    @start_at = Time.utc(year, month).in_time_zone(@timezone)
    @end_at = @start_at.end_of_month

    heading_title
    move_down 16

    conversation_tables
  end

  def self.terms(organization_device_id)
    organization_device = OrganizationDevice.find_by(id: organization_device_id)
    return [] if organization_device.nil?

    created_at = organization_device.created_at
    deleted_at = organization_device.deleted_at
    if created_at.nil?
      []
    else
      # TODO organization_deviceから安全に追えるDB上のtimezoneフィールドがないためいったんハードコーディング
      timezone = "Asia/Tokyo"
      since = created_at.in_time_zone(timezone)
      by = (deleted_at || Time.now).in_time_zone(timezone)
      year_months = []
      months = 1
      loop do
        start_at = since + months.months
        break if start_at > by

        year_months << start_at.to_a.slice(4, 2).reverse
        months += 1
      end

      year_months
    end
  end

  private

    def pdf_setup
      font_families.update('Report' => { normal: 'assets/fonts/ipaexm.ttf', bold: 'assets/fonts/ipaexg.ttf' })
      font 'Report'
    end

    def participant_users
      @participant_users ||= organization_device.users.select {|user| user.created_at < end_at }
    end

    def heading_title
      count = participant_users.inject(0) {|total, user| total + user_conversations(user).count }

      title = start_at.strftime(I18n.t("nh_report.title.conversations_in_month"))
      prefix = I18n.t("nh_report.title.total_numer_prefix")
      count_label = I18n.t("nh_report.table.conversation_count", count: count.to_s)
      text organization_device.organization_section.name + " " + title, :align => :center, :size => 20
      text prefix + count_label, :align => :center, :size => 14
    end

    def conversation_tables
      users = participant_users
      last_index = 0
      count = (users.count.to_f / 2).ceil

      users.each_with_index do |user, index|
        if index > 0 && index%2 == 0
          draw_text "#{index/2}/#{count}", :size => 12, :at => [250, 0]
          start_new_page
          move_down 50
        elsif index%2 == 1
          move_down 24
        end

        conversation_table(user)
        last_index = index
      end

      draw_text "#{last_index/2+1}/#{count}", :size => 12, :at => [250, 0]
    end

    def conversation_table(user)
      conversations = user_conversations(user)
      fixed_rows = 16
      fixed_conversations = plan_visible_conversations(conversations, fixed_rows)

      heading = ReportTable.create_columns(
        I18n.t("nh_report.table.head.date_time"),
        I18n.t("nh_report.table.head.remote_user_name"),
        I18n.t("nh_report.table.head.star_count"),
        I18n.t("nh_report.table.head.country"),
        I18n.t("nh_report.table.head.comment")
      )

      cols = [heading]
      fixed_conversations.map do |conversation|
        if conversation.is_a?(Conversation)
          format = I18n.t("organization.formats.datetime.long")
          time = conversation.start_at.in_time_zone(timezone).strftime(format)
          name = conversation.student.present? ? conversation.student.name_en + "さん" : ""
          evaluation = stars(user_evaluation(conversation, conversation.teacher))
          country_name = ISO3166::Country[conversation.student.country].translated_names[1]

          line = ReportTable.create_columns(time, name, evaluation, country_name, "")
        elsif conversation.is_a?(String) && conversation == "skipped"
          line = ReportTable.create_skipped_columns
        else
          line = ReportTable.create_empty_columns
        end
        cols << line
      end

      count_label = I18n.t("nh_report.table.conversation_count", count: conversations.count.to_s)
      text user.name_ja + "さん " + count_label, :size => 12
      move_down 2
      table(cols, cell_style: { size: 8 })
    end

    def conversations
      @conversations ||= Conversation.start_at_by(start_at).end_at_by(end_at).completed
    end

    def conversation_ids
      @conversation_ids ||= conversations.map(&:id)
    end

    def user_conversations(user)
      conversations.select {|c| c.send("#{user.type.downcase}_id") == user.id }.sort_by(&:start_at)
    end

    def plan_visible_conversations(all_conversations, fixed_rows)
      if all_conversations.count > fixed_rows
        half = fixed_rows / 2
        last_half = fixed_rows - 1 - half
        all_conversations.slice(0, half) + ["skipped"] + all_conversations.slice(all_conversations.count - last_half, last_half)
      else
        all_conversations + Array.new(fixed_rows - all_conversations.count, "empty")
      end
    end

    def user_evaluation(conversation, evaluatee_user)
      conversation.send("#{evaluatee_user.type.downcase}_evaluation_fun") || 0
    end

    def stars(evaluation)
      case evaluation
      when 1 then
        "談笑できた"
      when 2 then
        "感動した"
      when 3 then
        "新しい発見があった"
      when 4 then
        "その他よかった"
      when 5 then
        "不満がある"
      else
        "未評価"
      end
    end
end
