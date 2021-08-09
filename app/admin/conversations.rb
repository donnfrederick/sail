ActiveAdmin.register Conversation do
  menu priority: 60

  config.sort_order = "start_at_desc"

  permit_params :admin_user_id, :status, :start_at, :end_at,
                :teacher_id, :student_id

  action_item(:show) do
    link_to(
      I18n.t("activerecord.actions.conversation.disconnect_channel.button"),
      {controller: 'admin/sora', action: :disconnect_channel, conversation_id: params[:id]},
      method: :post,
      confirm: I18n.t("activerecord.actions.conversation.disconnect_channel.confirm")
    )
  end

  sidebar "CSV Import", only: :index do
    render 'shared/import'
  end

  index do
    selectable_column
    id_column
    column :status do |c|
      style = case c.status
              when Conversation::STATUS_QUEUED    then :warning
              when Conversation::STATUS_PROGRESS  then :ok
              when Conversation::STATUS_FAILED    then :error
              when Conversation::STATUS_CANCELED  then :error
              when Conversation::STATUS_UNMATCHED then :yes
              else nil
              end

      # @see vendor/bundle/ruby/*/gems/activeadmin-*/app/assets/stylesheets/active_admin/components/_status_tags.scss
      if c.current?
        channel_clients = Sora::Connection.request_connection_peers(c.channel_id)
        style = channel_clients.present? && channel_clients.count > 1 ? :ok : :error
        status_tag(c.status_name, class: style)
      else
        status_tag(c.status_name, class: style)
      end
    end
    column :accepting_requests do |c|
      data = if c.accepting_requests?
                [:yes, "リクエスト予約"]
              else
                [:warning, "通常予約"]
              end
      # @see vendor/bundle/ruby/*/gems/activeadmin-*/app/assets/stylesheets/active_admin/components/_status_tags.scss
      status_tag(data[1], class: data[0])
    end
    column :request_count do |c|
      c.requests.count
    end
    column :start_at do |c|
      c.start_at.to_s
    end
    column :end_at do |c|
      c.end_at.to_s
    end
    column :teacher do |c|
      if c.teacher.present?
        links = [
          link_to(c.teacher.name, admin_teacher_path(c.teacher)),
          "&nbsp;" + c.teacher.online_marker,
        ]

        links << "<br><small>(#{c.teacher_punctuality})</small>" if c.teacher_punctuality
        raw links.join("")
      end
    end
    column :teacher_reliability do |c|
      c.teacher.present? ? c.teacher.reliability_marker : "-"
    end
    column :student do |c|
      if c.student.present?
        links = [
          link_to(c.student.name, admin_student_path(c.student)),
          "&nbsp;" + c.student.online_marker,
        ]

        links << "<br><small>(#{c.student_punctuality})</small>" if c.student_punctuality
        raw links.join("")
      end
    end
    column :student_reliability do |c|
      c.student.present? ? c.student.reliability_marker : "-"
    end

    actions
  end

  csv force_quotes: true do
    column :id
    column :accepting_requests do |c|
      c.accepting_requests? ? 1 : 0
    end
    column :request_count
    column :teacher_id
    column :teacher_name
    column :teacher_punctuality
    column :teacher_reliability
    column :student_id
    column :student_name
    column :student_punctuality
    column :student_reliability
    column :created_at do |c|
      c.created_at.to_s
    end
    column :start_at do |c|
      c.start_at.to_s
    end
    column :end_at do |c|
      c.end_at.to_s
    end
    column :cancelled_at
    column :updated_at do |c|
      c.updated_at.to_s
    end
    column :completed do |c|
      c.status_completed? ? 1 : 0
    end
    column :failed do |c|
      c.status_failed? ? 1 : 0
    end
    column :cancelled do |c|
      c.status_cancelled? ? 1 : 0
    end
    column :unmatched do |c|
      c.status_unmatched? ? 1 : 0
    end
    column :unknown do |c|
      c.status_unknown? ? 1 : 0
    end
    column :video_chunk_count
  end

  filter :status,  as: :select, collection: Conversation::STATUS_NAMES.invert
  filter :start_at
  filter :end_at
  filter :teacher_id_equals, label: '日本人 ID'
  filter :student_id_equals, label: '学生 ID'
  filter :teacher, as: :select, collection: Teacher.all.map {|t| [t.id, "#{t.id}: #{t.name_ja}"]}.to_h.invert
  filter :student, as: :select, collection: Student.all.map {|t| [t.id, "#{t.id}: #{t.name_en}"]}.to_h.invert

  show do
    attributes_table do
      row :id
      row :channel_id
      row :status do |c|
        style = case c.status
                when Conversation::STATUS_QUEUED    then :warning
                when Conversation::STATUS_PROGRESS  then :ok
                when Conversation::STATUS_FAILED    then :error
                when Conversation::STATUS_CANCELED  then :error
                when Conversation::STATUS_UNMATCHED then :yes
                else nil
                end
        status_tag(c.status_name, class: style)
      end
      row :accepting_requests do |c|
        data = if c.accepting_requests?
                 [:yes, "リクエスト予約"]
               else
                 [:warning, "通常予約"]
               end
        # @see vendor/bundle/ruby/*/gems/activeadmin-*/app/assets/stylesheets/active_admin/components/_status_tags.scss
        status_tag(data[1], class: data[0])
      end
      row :requests do |c|
        links = c.requests.map do |conversation_request|
          next if conversation_request.from_user.nil?

          link_to(conversation_request.from_user.name_en, admin_student_path(conversation_request.from_user))
        end

        links << "(Total: #{links.count} people)"
        raw links.join("<br>")
      end
      row :start_at do |c|
        c.start_at.to_s
      end
      row :end_at do |c|
        c.end_at.to_s
      end
      row :teacher do |c|
        if c.teacher.present?

          links = [
            link_to(c.teacher.name, admin_teacher_path(c.teacher)),
            "&nbsp;" + c.teacher.online_marker,
          ]

          links << "<br><small>(#{c.teacher_punctuality})</small>" if c.teacher_punctuality
          raw links.join("")
        end
      end
      row :student do |c|
        if c.student.present?
          links = [
            link_to(c.student.name, admin_student_path(c.student)),
            "&nbsp;" + c.student.online_marker,
          ]

          links << "<br><small>(#{c.student_punctuality})</small>" if c.student_punctuality
          raw links.join("")
        end
      end
      row :connections do |c|
        links = []
        c.connection_statuses.order(requested_at: :desc).group_by {|s| s.requested_at.to_s }.each_with_index do |data|
          requested_at, connection_statuses = data
          links << "<dt>#{requested_at}</dt>"
          connection_statuses.map do |connection_status|
            link = link_to(
              connection_status.client_id.to_s,
                {controller: 'admin/sora', action: :disconnect_client, conversation_id: params[:id], client_id: connection_status.client_id},
                method: :post,
                confirm: I18n.t("activerecord.actions.conversation.disconnect_channel.confirm")
              )
            links << "<dd>#{link} (#{connection_status.minutes} minutes / #{connection_status.media})</dd>"
          end
        end
        raw links.join("")
      end
      row :video_chunks do |c|
        links = c.video_chunks.map do |video_chunk|
          link = link_to(video_chunk.file, "/admin/video?id=#{video_chunk.id}")
          "#{video_chunk.start_at.to_s} - #{video_chunk.end_at.to_s}: #{link}"
        end
        raw links.join("<br />")
      end
      row :created_at do |c|
        c.created_at.to_s
      end
      row :updated_at do |c|
        c.updated_at.to_s
      end
      row :matched_at do |c|
        c.matched_at.to_s
      end
      row :cancelled_at do |c|
        cc = CancelledConversation.find_by(conversation_id: c.id)
        c.cancelled_at(cc)
      end
    end
  end

  form do |f|
    f.semantic_errors *f.object.errors.keys
    Rails.logger.debug(f.object.errors.full_messages)

    if f.object.new_record?
      f.object.status   ||= Conversation::STATUS_QUEUED
      f.object.start_at ||= Time.zone.now.strftime("%Y-%m-%d %H:00:00")
      f.object.end_at   ||= f.object.start_at.try(:since, Conversation::DURATION)

      f.inputs "ビデオ通話" do
        f.input :status,  collection: Conversation::STATUS_NAMES.invert
        f.input :start_at
        f.input :end_at
        f.input :teacher_id,  as: :select,
                collection: Teacher.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
        f.input :student_id,  as: :select,
                collection: Student.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
        li raw "<input type='checkbox' name='conversation[skip_point_consumption]' value='1' checked /><label for='skip_point_consumption'>ポイントを消費しない</label>"
      end
      f.actions
    elsif !f.object.status_waiting?
      f.inputs "ビデオ通話" do
        f.protected_input :status,  collection: Conversation::STATUS_NAMES.invert
        f.protected_input :start_at
        f.protected_input :end_at
        f.protected_input :teacher_id,  as: :select,
                                        collection: Teacher.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
        f.protected_input :student_id,  as: :select,
                                        collection: Student.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
        li raw "<span style='color: #ff0000;'>すでに確定している会話データは編集できません。</span>"
      end
      para raw "<fieldset class='actions'><ol><li class='cancel'><a href='/admin/conversations'>取り消す</a></li></ol></fieldset>"
    else
      f.inputs "ビデオ通話" do
        f.protected_input :status,  collection: Conversation::STATUS_NAMES.invert
        f.protected_input :start_at
        f.protected_input :end_at
        f.protected_input :teacher_id,  as: :select,
                                        collection: Teacher.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
        f.input :student_id,  as: :select,
                              collection: Student.includes(:organizations).map{|u| ["#{u.id}: #{u.organizations.first.try(:name)} > #{u.name}", u.id] }
        li raw "<input type='checkbox' name='conversation[skip_point_consumption]' value='1' checked /><label for='skip_point_consumption'>ポイントを消費しない</label>"
      end
      f.actions
    end
  end

  controller do
    def scoped_collection
      Conversation.includes(:teacher, :student, :conversation_requests)
    end

    def end_at
      params = permitted_params[:conversation]
      local_time(
        params["end_at(1i)".to_sym],
        params["end_at(2i)".to_sym],
        params["end_at(3i)".to_sym],
        params["end_at(4i)".to_sym],
        params["end_at(5i)".to_sym],
      )
    end

    def start_at
      params = permitted_params[:conversation]
      local_time(
        params["start_at(1i)".to_sym],
        params["start_at(2i)".to_sym],
        params["start_at(3i)".to_sym],
        params["start_at(4i)".to_sym],
        params["start_at(5i)".to_sym],
      )
    end

    def local_time(year, month, date, hour, minute)
      last_timezone = Time.zone.name
      timezone = current_admin_user.try(:timezone).present? ? current_admin_user.try(:timezone) : "Asia/Tokyo"
      Time.zone = timezone
      time = Time.zone.parse("#{year}-#{month}-#{date} #{hour}:#{minute}:00")
      Time.zone = last_timezone
      time
    end

    def teacher_id
      tmp_teacher_id = permitted_params[:conversation][:teacher_id]
      tmp_teacher_id.present? ? tmp_teacher_id.try(:to_i) : nil
    end

    def student_id
      tmp_student_id = permitted_params[:conversation][:student_id]
      tmp_student_id.present? ? tmp_student_id.try(:to_i) : nil
    end

    def bulk_create(file)
      return false unless CSV.read(file,headers: true).headers[1..-1] == ["start_at", "end_at", "teacher_id", "student_id"]

      @current_conversations_count = ::Conversation.count
      @failure_count = 0

      CSV.foreach(file, headers: true) do |row|
        error_count += 1 and next if row.fields.include?(nil)

        begin
          create_service = ConversationCreateService.new(Teacher.find(row['teacher_id']))
          create_service.create(Time.parse(row['start_at']).utc,Time.parse(row['end_at']).utc)
          reserve_service = ConversationReserveService.new
          reserve_service.reserve_by_reservable_conversation(Student.find(row['student_id']), create_service.conversation.reservable_conversations.first)
        rescue => e
          @failure_count += 1
        end
      end
      true
    end

    def import_file_exist?
      params[:commit] == 'import' && params[:import_file].nil?
    end

    def create
      redirect_to :admin_conversations, notice: "Import file is not exist" and return if import_file_exist?()

      if params[:import_file].present?
        if bulk_create(params[:import_file].path) then redirect_to admin_conversations_path(order: 'id_desc'), notice: " #{::Conversation.count - @current_conversations_count} conversations has created. #{@failure_count} fails" and return else redirect_to :admin_conversations, notice: "CSV is not right format" and return end
      end

      @resource = Conversation.new(
        start_at:      start_at.utc,
        end_at:        end_at.utc,
        status:        permitted_params[:conversation][:status],
        admin_user_id: current_admin_user.id,
      )

      if teacher_id.nil?
        @resource.errors.add(:base, "You need to select a teacher at least.")
      elsif Teacher.find_by(id: teacher_id).blank?
        @resource.errors.add(:base, "No such a teacher (teacher id ##{teacher_id})")
      end

      if student_id.present? && Student.find_by(id: student_id).blank?
        @resource.errors.add(:base, "No such a student (student id ##{student_id})")
      end

      if @resource.errors.empty?
        create_service = ConversationCreateService.new(Teacher.find(teacher_id))
        if create_service.create(start_at.utc, end_at.utc)
          skip_point_consumption = params["conversation"].present? && params["conversation"]["skip_point_consumption"].present? && params["conversation"]["skip_point_consumption"].to_i != 0
          if skip_point_consumption
            create_service.conversation.update(admin_user_id: current_admin_user.id)
          end

          if student_id.present?
            create_service.conversation.reload
            reserve_service = ConversationReserveService.new
            begin
              reserve_service.reserve_by_reservable_conversation(Student.find(student_id), create_service.conversation.reservable_conversations.first)

              unless skip_point_consumption
                create_service.conversation.update(admin_user_id: current_admin_user.id)
              end

              redirect_to admin_conversation_path(create_service.conversation), notice: "success"
            rescue
              @resource = create_service.conversation
              message = reserve_service.errors.try(:full_messages) || "no specific error"
              create_service.conversation.destroy
              @resource.errors.add(:base, message)
            end
          else
            redirect_to admin_conversation_path(create_service.conversation), notice: "success"
          end
        else
          @resource = create_service.conversation
          render template: "active_admin/resource/new"
        end
      else
        render template: "active_admin/resource/new"
      end

    rescue ActiveRecord::RecordInvalid
      render template: "active_admin/resource/new"
    end

    # 会話データの編集は空き時間に対して学生をあてがうときだけ
    # それ以外は会話データを別に作るべきなのでエラーを返す
    def update
      unless resource.status_waiting?
        resource.errors.add(:base, "You cannot change the matched conversation. Please create another conversation instead.")

        render template: "active_admin/resource/edit"
        return
      end

      skip_point_consumption = params["conversation"].present? && params["conversation"]["skip_point_consumption"].present? && params["conversation"]["skip_point_consumption"].to_i != 0
      resource.update(admin_user_id: skip_point_consumption ? current_admin_user.id : nil)

      student = Student.find(student_id)
      reserve_service = ConversationReserveService.new
      reserve_service.reserve_by_reservable_conversation(student, resource.reservable_conversations.first)

      unless skip_point_consumption
        resource.update(admin_user_id: current_admin_user.id)
      end

      redirect_to admin_conversation_path(resource), notice: "success"

    rescue ActiveRecord::RecordInvalid
      render template: "active_admin/resource/edit"
    end

    def destroy
      service = ConversationCancelService.new resource
      service.cancel_by_admin(true)
      url = Pathname(admin_conversation_path(resource)).dirname.to_s
      redirect_to url
    end

    private
  end
end
