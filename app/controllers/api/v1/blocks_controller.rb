module Api
  module V1
    class BlocksController < ApiController
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
        blocks = current_user.blocks_from_user.paginate(page: page, per_page: per_page)

        render json: blocks,
               root: :data,
               adapter: :json,
               meta: {
                 current_page:  blocks.current_page,
                 per_page:      blocks.per_page,
                 previous_page: blocks.previous_page,
                 next_page:     blocks.next_page,
                 total_pages:   blocks.total_pages,
                 total_entries: blocks.total_entries,
              }
      end

      def create
        service = BlockService.new current_user
        if service.block(User.find(params[:user_id]))
          render json: service.blocked_user, status: :created
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        to_user = User.find(params[:user_id])
        block = Block.by_from_user(current_user).by_to_user(to_user).first

        raise ActiveRecord::RecordNotFound if block.nil?

        if block.destroy
          render json: block.to_user
        else
          Rails.logger.error block.errors.full_messages
          render_error(block.errors.full_messages, :unprocessable_entity)
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
