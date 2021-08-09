module Organizations
  # それぞれのユーザーの種類の共通した処理を実装しています。
  #
  # ユーザーの種類に応じた階層のトップレベルのページコントローラーは
  # このコントローラーを継承してください。
  class UsersController < BaseController
    # ログイン後のトップページ (ダッシュボード)
    #
    # 直近の情報をまとめてすばやく確認できるページです。
    def index(page = 1, per_page = 15)
      page = params[:page] if params[:page].present?
      per_page = params[:per_page] if params[:per_page].present?

      @notifications = notifications(page, per_page)
      @conversations = conversations(page, per_page)
    end

    private
    def notifications(page, per_page)
      if current_staff.organization_device
        Notification.by_section(current_staff.organization_section).
        by_user(current_staff.organization_device.users).
        where.not(notificated_at: nil).
        order(notificated_at: :desc).
        paginate(page: page, per_page: per_page)
      else
        Notification.by_section(current_staff.organization_section).
        where.not(notificated_at: nil).
        order(notificated_at: :desc).
        paginate(page: page, per_page: per_page)
      end 
    end

    def conversations(page, per_page)
      if current_staff.organization_device
        Conversation.scheduled.
        start_at_by(Time.now).
        send(current_staff.nursing_house? ? :by_teacher_id : :by_student_id, current_staff.organization_device.users.map(&:id)).
        order(start_at: :asc).all
      else
        Conversation.scheduled.
        start_at_by(Time.now).
        send(current_staff.nursing_house? ? :by_teacher_id : :by_student_id, current_staff.organization_section.users.map(&:id)).
        order(start_at: :asc).all
      end
    end
  end
end
