module Api
  module V1
    class FavoritesController < ApiController
      DEFAULT_PAGE     = 1
      DEFAULT_PER_PAGE = 10

      validates :index do
        integer :page,     description: "Default: 1\nページ番号"
        integer :per_page, description: "Default: 10\n1ページあたりの件数"
      end

      validates :create do
        integer :user_id, required:    true,
                         description: "対象ユーザーの user.id"
      end

      validates :destroy do
        integer :user_id, required:    true,
                         description: "対象ユーザーの user.id"
      end

      def index
        favorites = current_user.favorites_from_user.paginate(page: page, per_page: per_page)

        render json: favorites,
               root: :data,
               adapter: :json,
               meta: {
                 current_page:  favorites.current_page,
                 per_page:      favorites.per_page,
                 previous_page: favorites.previous_page,
                 next_page:     favorites.next_page,
                 total_pages:   favorites.total_pages,
                 total_entries: favorites.total_entries,
              }
      end

      def create
        favorite = Favorite.new
        favorite.from_user_id = current_user.id
        favorite.to_user_id   = params[:user_id]

        if favorite.save
          render json: favorite.to_user, status: :created
        else
          Rails.logger.error favorite.errors.full_messages
          render_error(favorite.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        favorite = Favorite.where(from_user_id: current_user.id, to_user_id: params[:user_id]).first

        raise ActiveRecord::RecordNotFound if favorite.nil?

        if favorite.destroy
          render json: favorite.to_user
        else
          Rails.logger.error favorite.errors.full_messages
          render_error(favorite.errors.full_messages, :unprocessable_entity)
        end
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
