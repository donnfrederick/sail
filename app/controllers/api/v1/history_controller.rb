module Api
  module V1
    class HistoryController < ApiController
      DEFAULT_PAGE     = 1
      DEFAULT_PER_PAGE = 10

      validates :index do
        integer :page,     description: "Default: 1\nページ番号"
        integer :per_page, description: "Default: 10\n1ページあたりの件数"
      end

      def index
        conversations = if current_user.teacher?
                          current_user.visible_conversations.finished.paginate(page: page, per_page: per_page).order("start_at DESC")
                        else
                          current_user.visible_conversations.finished.paginate(page: page, per_page: per_page).order("start_at DESC")
                        end


        render json: conversations,
               root: :data,
               adapter: :json,
               include: { users: [:hobbies, :purposes] },
               meta: {
                 current_page:  conversations.current_page,
                 per_page:      conversations.per_page,
                 previous_page: conversations.previous_page,
                 next_page:     conversations.next_page,
                 total_pages:   conversations.total_pages,
                 total_entries: conversations.total_entries,
              }
      end

      private
        def page
          params[:page].presence || DEFAULT_PAGE
        end

        def per_page
          params[:per_page].presence || DEFAULT_PER_PAGE
        end
    end
  end
end
