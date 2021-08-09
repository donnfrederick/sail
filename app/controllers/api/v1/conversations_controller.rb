module Api
  module V1
    class ConversationsController < ApiController
      before_action :set_conversation, only: [
        :show, :destroy, :evaluate, :report, :memo, :start
      ]

      validates :index do
        date :start_on, format: %w[%Y/%m/%d %Y.%m.%d %Y-%m-%d],
                        description: "Default: null\n開始日 'end_on' と組み合わせて使用します。\n※ 'term', 'page' とは併用できません"
        date :end_on,   format: %w[%Y/%m/%d %Y.%m.%d %Y-%m-%d],
                        description: "Default: null\n終了日 'start_on' と組み合わせて使用します。 \n※ 'term', 'page' とは併用できません"

        string :term,   only: Conversation::TERMS,
                        description: "Default: null\n週単位、月単位で予約情報を取得します\nweek: 週単位, month: 月単位\n※ 'page' と併用することができ、'start_on', 'end_on' とは併用できません）"
        integer :page,  description: "Default: 1\n1: 今週 (or 今月), 2: 来週 (or 来月), ...\n※ 'term' と併用することができ、'start_on', 'end_on' とは併用できません）"
      end

      validates :create do
        time :start_at,              required: true,
                                     strong:   true,
                                     format:   ["%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%dT%H:%M:%S%:z"],
                                     description: "Default: null\n予約の希望開始日時"
        time :end_at,                strong: true,
                                     format: ["%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%dT%H:%M:%S%:z"],
                                     description: "Default: null\n予約の希望終了日時"
        integer :accepting_requests, only: [0, 1],
                                     description: "リクエスト枠予約かどうかの値\n0: 通常予約, 1: リクエスト枠予約"

      end

      validates :evaluate do
        integer :fun,     only: Evaluation::FUNS,
                          strong:   true,
                          description: "会話は楽しめましたか\n1: 談笑できた, 2: 感動した, 3: 新しい発見があった, 4: その他よかった, 5: 不満がある"
        integer :ability, only: Evaluation::ABILITIES,
                          strong:   true,
                          description: "日本語レベルはどうでしたか\n1: スムーズに会話ができた, 2: たまに単語が出ないでつまずいた, 3: 続くけどしどろもどろ, 4: あまり続かない, 5: まったく会話にならない"
        integer :time,    only: Evaluation::TIMES,
                          strong:   true,
                          description: "時間どおりに現れましたか\n1: 時間通りに来た, 2: 少し遅刻した, 3: 5分以上遅刻した, 4: 来なかった"
        array :quality,   required: true,
                          strong:   true,
                          description: "映像や音声の質はどうでしたか\n1: 映像がたまに切れていた, 2: まったく映らなかった, 3: 周囲の雑音が多かった, 4: 音声がブツブツ切れていた"
      end

      validates :calendar do
        integer :year,  format:      "%Y",
                        description: "Default: Current Year\n年を指定"
        integer :month, format:      "%m",
                        description: "Default: Current Month\n月を指定"
      end

      validates :recommend do
        time :date_on, strong: true,
                       format: ['%Y/%m/%d','%Y.%m.%d','%Y-%m-%d', '%Y-%m-%dT%H:%M:%S'],
                       description: "Default: Today\n指定日のおすすめのユーザーの一覧を取得する"
      end

      validates :reserve do
        integer :id, required: true,
                     description: "Default: null\n予約を行う conversation.id を指定します"
      end

      validates :report do
        array :report_reasons,  required: true,
                                strong: true,
                                description: "報告理由を教えてください\n1: 他サービスへの勧誘行為, 2: スパム・宣伝目的, 3: 出会い・わいせつ目的, 4: 犯罪・違法行為, 5: その他、迷惑行為"
        string :report_detail,  required: true,
                                strong: true,
                                length: {
                                  maximum: 2048,
                                  too_long: "最大%{count}文字まで使えます",
                                },
                                description: "よろしければ詳細を教えてください (自由文)"
        integer :request_block, only: [0, 1],
                                description: "このユーザーをブロックする\n1: ブロックする, 2: ブロックしない"
      end

      validates :memo do
        string :memo,  required: true,
                       strong: true,
                       length: {
                         maximum: 2048,
                         too_long: "最大%{count}文字まで使えます",
                       },
                       description: "メモの本文 (自由文)"
      end

      def index
        # 既存のコードを使って3ヶ月後までの全ての会話予約を抽出するための苦肉の策。改善予定
        params[:start_on] = Time.now.beginning_of_day
        params[:end_on] = Time.now.since(3.months).end_of_day
        service = UpcomingConversationListService.new current_user

        conversations, start_on, end_on = if params[:start_on].present? && params[:end_on].present?
                                            service.list_by_date(params[:start_on], params[:end_on])
                                          elsif params[:term].present?
                                            service.list_by_term(params[:term], params[:page])
                                          else
                                            service.list_by_default
                                          end

        render json: {
          data: ConversationSerializer.each_json(conversations),
          include: { users: [:hobbies, :purposes, :favorites, :blocks] },
          meta: {
            start_on: start_on,
            end_on:   end_on,
          },
        }
      end

      def show
        render json: @conversation
      end

      def create
        accepting_requests = params[:accepting_requests].present? && params[:accepting_requests].to_i != 0
        service = ConversationCreateService.new current_user
        if service.create(params[:start_at], params[:end_at], accepting_requests)
          render json: service.conversation,
                 status: :created
        elsif service.conversation.duplicated_schedules.present?
          render_error(service.conversation.duplicated_schedules, :not_acceptable)
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        service = ConversationCancelService.new @conversation
        if service.cancel_by_user(current_user)
          head :no_content
        elsif service.past?
          head :unprocessable_entity
        else
          head :unauthorized
        end
      end

      def evaluate
        service = EvaluationService.new @conversation, current_user
        if service.evaluate_from_params(params)
          render json: @conversation,
                 status: :ok
        elsif service.not_permitted?
          render_error([I18n.t("errors.conversation.not_permitted")], :not_acceptable)
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def calendar
        start_on = if Date.valid_date?(params[:year].to_i, params[:month].to_i, 1)
                     Date.new(params[:year].to_i, params[:month].to_i, 1)
                   else
                     Date.today.beginning_of_month
                   end

        end_on = start_on.end_of_month


        # 自分が予約している日（終了した会話は含まない）
        reserved_days = current_user.reserved_dates(start_on, end_on).map(&:day)

        # 予約可能な日
        enable_days = current_user.enable_dates(start_on, end_on).map(&:day)

        result = {}
        (start_on..end_on).to_a.each do |date|
          result[date.day.to_s] = {
            is_enabled:  enable_days.include?(date.day),
            is_reserved: reserved_days.include?(date.day),
          }
        end

        render json: result
      end

      def recommend
        date_on = permitted_params[:date_on].presence || Time.zone.now
        syspcurrentpage = params[:syspcurrentpage] || 20
        syspcurrentpage = syspcurrentpage.to_i

        requesting_conversation_ids = ConversationRequest.by_user_id(current_user.id).pluck(:conversation_id)

        @reservable_conversations = current_user.
          reservable_conversations_on(date_on).
          reject {|rc| requesting_conversation_ids.include?(rc.conversation_id) }.
          sort {|a, b| a.start_at <=> b.start_at || current_user.score(b.user) <=> current_user.score(a.user) }

        @reservable_conversations.reject! do |rc|
          if rc.user.organization_sections.select(&:tutoring).present?
            @reservable_conversations.select {|rcx| rcx.start_at.to_i == rc.start_at.to_i && rc.id != rcx.id && rcx.user.organization_sections.select(&:tutoring).empty? }.present?
          else
            false
          end
        end

        render json: ReservableConversationSerializer.each_json(@reservable_conversations).first(syspcurrentpage)
      end

      def reserve
        service = ConversationReserveService.new
        if service.reserve_by_reservable_conversation_id(current_user, params[:id])
          render json: service.conversation
        elsif service.past?
          render_error([I18n.t("errors.conversation.not_available")], :unprocessable_entity)
        elsif service.errors.full_messages == "Issue must exist"
          Rails.logger.error service.errors.full_messages
          render_error("You need to update your contract", :unprocessable_entity)
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def show_recommend
        @reservable_conversation = ReservableConversation.find(params[:id])
        render json: @reservable_conversation
      end

      def show_cancelled
        @cancelled_conversation = CancelledConversation.find_by(conversation_id: params[:id])
        render json: @cancelled_conversation
      end

      def report
        block_requested = params[:request_block].present? && params[:request_block].to_i != 0
        service = ConversationReportService.new(@conversation, current_user)

        if service.report_from_params(params, block_requested)
          render json: ConversationSerializer.new(service.conversation).context_user_report_detailed,
                 status: request.post? ? :created : :ok
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def memo
        service = ConversationMemoService.new(@conversation, current_user)

        if service.memo_from_params(params)
          render json: ConversationSerializer.new(service.conversation).context_user_memo,
                 status: :created
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def only_accepting_requests
        conversations = current_user.conversations.only_accepting_requests.end_at_since(Time.now + 25.minutes).sorted
        render json: conversations
      end

      def start
        if @conversation.started? # just in case
          @conversation.appear!(current_user.type.downcase)

          # OPTIMIZE: 非同期で処理を行うべきです
          service = ConversationStatusCheckService.new @conversation
          service.check!
        end

        render json: {}, status: :ok
      end

      private

        def set_conversation
          @conversation = current_user.conversations.find(params[:id])
        end
    end
  end
end
