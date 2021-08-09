module Api
  module V1
    class NotificationsController < ApiController
      DEFAULT_PAGE     = 1
      DEFAULT_PER_PAGE = 10

      before_action :set_notification, only: [:show]
      after_action :update_last_readed_at, only: [:index, :show]

      validates :index do
        integer :page,     description: "Default: 1\nページ番号"
        integer :per_page, description: "Default: 10\n1ページあたりの件数"
      end

      def index
        filter = current_user.teacher? ? { body_ja: "" } : { body_en: "" }
        notifications = Notification.user_by(current_user).where.not(filter).
                          paginate(page: page, per_page: per_page).
                          published.
                          available.
                          recently

        render json: notifications,
               root: :data,
               adapter: :json,
               meta: {
                 current_page:  notifications.current_page,
                 per_page:      notifications.per_page,
                 previous_page: notifications.previous_page,
                 next_page:     notifications.next_page,
                 total_pages:   notifications.total_pages,
                 total_entries: notifications.total_entries,
              }
      end

      def show
        render json: @notification
      end

      def stats
        content = {
          unread_count: current_user.unread_count,
        }

        render json: content
      end

      private

        def update_last_readed_at
          current_user.try(:update_last_readed_at)
        end

        def set_notification
          @notification = Notification.
                            user_by(current_user).
                            published.
                            find(params[:id])
        end

        def page
          params[:page].presence || DEFAULT_PAGE
        end

        def per_page
          params[:per_page].presence || DEFAULT_PER_PAGE
        end
    end
  end
end
