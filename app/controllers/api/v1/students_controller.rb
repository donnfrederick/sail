module Api
  module V1
    class StudentsController < ApiController
      skip_before_action :auth_with_token!, only: [:create, :hobbies, :purposes, :categories, :tags, :getselectedtags, :add_tag, :added_tag, :delete_added_tags, :add_selected_tag, :password_reset_email, :password_reset_update, :validate]

      before_action :set_student, only: [:show, :evaluations]

      validates :create do
        string :email,    required:    true,
                          strong:      true,
                          description: "メールアドレス"

        string :introduce,    strong:      true,
                          description: "自己紹介"

        string :password, required:    true,
                          strong:      true,
                          description: "パスワード"

        string :password_confirmation, strong:      true,
                                       description: "パスワード（確認）"

        string :name,    required:    true,
                         strong:      true,
                         description: "名前 ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        string :name_ja, strong:      true,
                         description: "名前 ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        integer :sex,    strong:      true,
                         only:        User::SEXES,
                         description: "1: 男性, 2: 女性, 9: その他"

        any :picture,    required:    true,
                         description: "multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)"

        integer :conversation_level,    required:    true,
                                        strong:      true,
                                        description: "日本語会話レベル"

        integer :level,    required:    true,
                           strong:      true,
                           description: "JLPT(日本語能力試験)のレベル"

        string  :country,  required:    true,
                           strong:      true,
                           description: "国コード/国名のリストは別途API経由で取得"

        string  :timezone, required:    true,
                           strong:      true,
                           description: "TimeZoneのリストは別途API経由で取得"

        array :hobbies,  required: true,
                         description: "最大3つまで\n1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会"

        array :purposes, required: true,
                         description: "最大3つまで\n1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい"

        string :fcm_token, strong: true

        string  :phone_number, required:    false,
                               strong:      true,
                               description: "国際番号を除く有効な電話番号を指定 (ハイフン含んでもよい)"
      end

      validates :update do
        string :email,    strong:      true,
                          description: "メールアドレス"

        string :introduce,    strong:      true,
                          description: "自己紹介"

        string :current_password, description: "現在のパスワード"

        string :password, description: "新しいパスワード"

        string :password_confirmation, description: "新しいパスワード（確認）"

        string :name,    strong:      true,
                         description: "名前 ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        string :name_ja, strong:      true,
                         description: "名前 ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        integer :sex,    strong:      true,
                         only:        User::SEXES,
                         description: "1: 男性, 2: 女性, 9: その他"

        any :picture,    description: "multipart/form-data OR base64 encoded files (data:image/jpeg;base64,...)"

        integer :conversation_level,    strong:      true,
                                        description: "日本語会話レベル"

        integer :level,    strong:      true,
                           description: "JLPT(日本語能力試験)のレベル"

        string  :country,  strong:      true,
                           description: "国コード/国名のリストは別途API経由で取得"

        string  :timezone, strong:      true,
                           description: "TimeZoneのリストは別途API経由で取得"

        array :hobbies,  description: "最大3つまで\n 1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会"

        array :purposes, description: "最大3つまで\n1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい"

        string :fcm_token, strong: true
      end

      validates :validate do
        string :email,    strong:      true,
                          description: "メールアドレス"

        string :introduce,    strong:      true,
                          description: "メールアドレス"

        string :password, strong:      true,
                          description: "新しいパスワード"

        string :name,    strong:      true,
                         description: "名前（ひらがな） ※ 入力フォームで姓名に分かれている場合は半角スペースで連結"

        integer :sex,    strong:      true,
                         only:        User::SEXES,
                         description: "1: 男性, 2: 女性, 9: その他"

        integer :conversation_level,    strong:      true,
                                        description: "日本語会話レベル"

        integer :level,    strong:      true,
                           description: "JLPT(日本語能力試験)のレベル"

        string  :country,  strong:      true,
                           description: "国コード/国名のリストは別途API経由で取得"

        string  :timezone, strong:      true,
                           description: "TimeZoneのリストは別途API経由で取得"
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
        render json: @student
      end

      def create
        service = StudentCreateService.new(permitted_params)

        service.assign_hobbies  params[:hobbies]
        service.assign_purposes params[:purposes]
        service.assign_picture  params[:picture]

        if service.create
          render json: service.student,
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
        @student = Student.new(permitted_params)

        if @student.valid_attribute?(permitted_params.keys)
          render json: permitted_params, status: :ok
        else
          Rails.logger.error @student.errors.full_messages
          render_error(@student.errors.full_messages, :unprocessable_entity)
        end
      end

      def hobbies
        render json: Hobby.by_student
      end

      def purposes
        render json: Purpose.by_student
      end

      def categories
        categories = Category.all.where('delete_flg = 0')
        render json: categories
      end

      def tags
        tags = Tag.all
        render json: tags
      end

      def add_tag
        category_id = params[:category_id]
        name_en = params[:name_en]
        lang = params[:lang]

        add_new_tag = Tag.new

        case lang
        when 'name_jp'
          add_new_tag.name_jp = name_en
        when 'name_indo'
          add_new_tag.name_indo = name_en
        when 'name_vietnam'
          add_new_tag.name_vietnam = name_en
        when 'name_china'
          add_new_tag.name_china = name_en
        when 'name_taiwan'
          add_new_tag.name_taiwan = name_en
        when 'name_taly'
          add_new_tag.name_taly = name_en
        when 'name_spain'
          add_new_tag.name_spain = name_en
        when 'name_france'
          add_new_tag.name_france = name_en
        else
          add_new_tag.name_en = name_en
        end

        add_new_tag.delete_flg = 0

        add_new_tag.category_id = category_id
        
        add_new_tag.save
        
        tags = Tag.all
        render json: tags
      end

      def added_tag
        category_id = params[:category_id]
        name_en = params[:name_en]
        lang = params[:lang]

        add_new_tag = AddedTag.new

        case lang
        when 'name_jp'
          add_new_tag.name_jp = name_en
        when 'name_indo'
          add_new_tag.name_indo = name_en
        when 'name_vietnam'
          add_new_tag.name_vietnam = name_en
        when 'name_china'
          add_new_tag.name_china = name_en
        when 'name_taiwan'
          add_new_tag.name_taiwan = name_en
        when 'name_taly'
          add_new_tag.name_taly = name_en
        when 'name_spain'
          add_new_tag.name_spain = name_en
        when 'name_france'
          add_new_tag.name_france = name_en
        else
          add_new_tag.name_en = name_en
        end

        add_new_tag.category_id = category_id
        
        add_new_tag.save
        
        added_tag = AddedTag.all
        render json: added_tag
      end

      def delete_added_tags
        AddedTag.delete_all

        added_tag = AddedTag.all
        render json: added_tag
      end

      def add_selected_tag
        tag_id = params[:tag_id]
        user_email = params[:user_email]
        tag_name = params[:tag_name]
        add_new_selected_tag = SelectedTag.new
        add_new_selected_tag.user_email = user_email
        add_new_selected_tag.tag_id = tag_id
        add_new_selected_tag.tag_name = tag_name
        add_new_selected_tag.delete_flg = 0
        add_new_selected_tag.save

        tags = Tag.all
        render json: tags
      end

      def getselectedtags
        render json: SelectedTag.all.where('delete_flg = 0')
      end

      def password_reset_email
        student = Student.by_email(params[:email]).first

        if student.nil?
          render_error(I18n.t("errors.messages.this_not_found", name: "メールアドレス"), :not_found)
        elsif student.create_reset_digest
          student.send_password_reset_email
          render json: {}, status: :ok
        else
          Rails.logger.error student.errors.full_messages
          render_error(student.errors.full_messages, :unprocessable_entity)
        end
      end

      def password_reset_update
        student = Student.by_digest(params[:token]).first
        raise ActiveRecord::RecordNotFound if student.nil?

        if student.update_password_with_reset_digest(params[:password])
          render json: {}, status: :ok
        else
          Rails.logger.error student.errors.full_messages
          render_error(student.errors.full_messages, :unprocessable_entity)
        end
      end

      def evaluations
        render json: UsersConversationHistorySerializer.new(@student).to_json2, status: :ok
      end

      private
      def set_student
        @student = Student.find(params[:id])
      end
    end
  end
end
