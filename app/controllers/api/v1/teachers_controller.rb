module Api
  module V1
    class TeachersController < ApiController
      skip_before_action :auth_with_token!, only: [:create, :hobbies, :purposes, :password_reset_email, :password_reset_update, :validate]

      before_action :set_teacher, only: [:show, :evaluations]

      validates :create do
        string :email,    required:    true,
                          strong:      true,
                          description: "メールアドレス"

        string :password, required:    true,
                          strong:      true,
                          description: "パスワード"

        string :name,    required:    true,
                         strong:      true,
                         description: "名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        integer :preferred_name, strong: true, only: User::NAME_PREFERENCES, description: "1: フルネーム, 2:めい, 3:せい"

        integer :sex,    strong:      true,
                         only:        User::SEXES,
                         description: "1: 男性, 2: 女性, 3: 言いたくありません, 9: その他"

        any :picture,    required:    true,
                         description: "multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)"

        integer :desired_condition, required: true,
                                    strong: true,
                                    only: User::DESIRED_CONDITIONS,
                                    description: "1:日本語が得意な方がいい, 2:日本語が不得意でも構わない"

        array :hobbies,  required: true,
                         description: "最大3つまで\n1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会"

        array :purposes, required: true,
                         description: "最大3つまで\n1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい"

        string :fcm_token, strong: true
      end

      validates :update do
        string :email,    strong:      true,
                          description: "メールアドレス"

        string :current_password, description: "現在のパスワード"

        string :password, description: "新しいパスワード"

        string :name,    strong:      true,
                         description: "名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        integer :preferred_name, strong: true, only: User::NAME_PREFERENCES, description: "1: フルネーム, 2:めい, 3:せい"

        integer :sex,    strong:      true,
                         only:        User::SEXES,
                         description: "1: 男性, 2: 女性, 3: 言いたくありません, 9: その他"

        any :picture,    description: "multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)"

        integer :desired_condition, strong: true,
                                    only: User::DESIRED_CONDITIONS,
                                    description: "1:日本語が得意な方がいい, 2:日本語が不得意でも構わない"

        array :hobbies,  description: "最大3つまで\n1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会"

        array :purposes, description: "最大3つまで\n1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい"

        string :fcm_token, strong: true

        string :introduce, strong: true, description: "自己紹介"
      end

      validates :validate do
        string :email,    strong:      true,
                          description: "メールアドレス"

        string :password, strong:      true,
                          description: "新しいパスワード"

        string :name,    strong:      true,
                         description: "名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        integer :preferred_name, strong: true, only: User::NAME_PREFERENCES, description: "1: フルネーム, 2:名前, 3:苗字"

        integer :sex,    strong:      true,
                         only:        User::SEXES,
                         description: "1: 男性, 2: 女性, 9: その他"

        integer :desired_condition, strong: true,
                                    only: User::DESIRED_CONDITIONS,
                                    description: "1:日本語が得意な方がいい, 2:日本語が不得意でも構わない"
      end

      validates :password_reset_email do
        string :email, required: true,
                       description: "メールアドレス"
      end

      validates :password_reset_update do
        string :token, required:    true,
                       strong:      true,
                       description: "リセットトークン"

        string :password, required: true,
                          description: "新しいパスワード"
      end

      def me
        render json: current_user, serializer: CurrentUserSerializer
      end

      def show
        render json: @teacher
      end

      def create
        service = TeacherCreateService.new(permitted_params)

        service.assign_hobbies(params[:hobbies])
        service.assign_purposes(params[:purposes])
        service.assign_picture(params[:picture])

        service.remote_ip = request.remote_ip
        if service.create
          render json: service.teacher,
                 serializer: CurrentUserSerializer,
                 status: :created
        else
          Rails.logger.error service.errors.full_messages
          render_error(service.errors.full_messages, :unprocessable_entity)
        end
      end

      def update
        current_user.attributes      = permitted_params
        current_user.assign_hobbies  = params[:hobbies]
        current_user.assign_purposes = params[:purposes]
        current_user.assign_picture  = params[:picture]

        current_user.assign_new_password(params[:current_password], params[:password])

        if current_user.errors.empty? && current_user.save
          current_user.reload
          render json: current_user, serializer: CurrentUserSerializer
        else
          Rails.logger.error current_user.errors.full_messages
          render_error(current_user.errors.full_messages, :unprocessable_entity)
        end
      end

      def destroy
        current_user.destroy
        head :no_content
      end

      # TODO: hobbies, purposes, picture も validate 対象にするかどうか検討
      def validate
        @teacher = Teacher.new(permitted_params)

        if @teacher.valid_attribute?(permitted_params.keys)
          render json: permitted_params, status: :ok
        else
          Rails.logger.error @teacher.errors.full_messages
          render_error(@teacher.errors.full_messages, :unprocessable_entity)
        end
      end

      def hobbies
        render json: Hobby.by_teacher
      end

      def purposes
        render json: Purpose.by_teacher
      end

      def password_reset_email
        teacher = Teacher.by_email(params[:email]).first

        if teacher.nil?
          render_error(I18n.t("errors.messages.this_not_found", name: "メールアドレス"), :not_found)
        elsif teacher.create_reset_digest
          teacher.send_password_reset_email
          render json: {}, status: :ok
        else
          Rails.logger.error teacher.errors.full_messages
          render_error(teacher.errors.full_messages, :unprocessable_entity)
        end
      end

      def password_reset_update
        teacher = Teacher.by_digest(params[:token]).first
        raise ActiveRecord::RecordNotFound if teacher.nil?

        if teacher.update_password_with_reset_digest(params[:password])
          render json: {}, status: :ok
        else
          Rails.logger.error teacher.errors.full_messages
          render_error(teacher.errors.full_messages, :unprocessable_entity)
        end
      end

      def evaluations
        json = UsersConversationHistorySerializer.new(@teacher).to_json2
        render json: json, status: :ok
      end

      private

        def set_teacher
          @teacher = Teacher.find(params[:id])
        end
    end
  end
end
