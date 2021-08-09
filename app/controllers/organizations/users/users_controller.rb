module Organizations
  module Users
    # 管理下にある他のユーザーのアカウントを扱うページのコントローラーです。
    class UsersController < BaseController
      include Concerns::TheUser

      def show
        render @user.teacher? ? "show_teacher" : "show_student"
      end

      # 新しいアカウントを追加
      def new
        @dimension_id = params[:dimension_id].present? ? params[:dimension_id] : nil
      end

      # 当該セクションに新しいアカウントを追加
      def create
      end

      def edit
      end

      # 当該アカウントの情報を変更し適用する
      def update
      end

      # アカウントの削除前の確認画面
      def confirm_to_delete
      end

      # アカウントの削除前
      def destroy
        @user.destroy

        redirect_to "/organizations/#{current_staff.nursing_house? ? "nhs" : "univs"}/users/list"
      end
    end

    protected

    def find_role_user_by(conditions)
      User.find_by(conditions)
    end
  end
end
