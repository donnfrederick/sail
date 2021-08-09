module Organizations
  module Nhs
    # 管理下にある他のユーザーのアカウントを扱うページのコントローラーです。
    class UsersController < ::Organizations::Users::UsersController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs
      include Concerns::RandomEmail

      before_action :current_section,                          only: [:new, :create, :list, :edit]
      before_action :before_the_dimension,                     only: [:new, :create]
      before_action :the_dimension,                            only: [:list, :create]
      before_action :available_devices,                        only: [:new, :create]
      before_action :to_invalid_device, if: :the_at_max_users, only: :create
      before_action :the_hobbies,                              only: [:new,  :create, :edit, :update]
      before_action :the_purposes,                             only: [:new,  :create, :edit, :update]
      before_action :the_at_max_users,                         only: [:list]

      validates :create do
        string :name_ja,                  required: true,
                                          description: "name ja"
        integer :sex,                     required: true,
                                          description: "sex"
        integer :organization_device_id,  required: true,
                                          description: "device ID"
        array :hobbies,                   required: true,
                                          description: "最大3つまで\n1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会"
        array :purposes,                  required: true,
                                          description: "最大3つまで\n1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい"
        integer :desired_condition,       strong: true,
                                          only: User::DESIRED_CONDITIONS,
                                          description: "1:日本語が得意な方がいい, 2:日本語が不得意でも構わない"
      end

      validates :update do
        integer :user_id,                 required: true,
                                          description: "user ID"
        string :name_ja,                  required: true,
                                          description: "name ja"
        integer :sex,                     required: true,
                                          description: "sex"
        array :hobbies,                   required: true,
                                          description: "最大3つまで\n1:料理, 2:読書, 3:スポーツ, 4:歴史, 5:音楽, 6: 芸術, 7:哲学, 8:旅行, 9:社会"
        array :purposes,                  required: true,
                                          description: "最大3つまで\n1:若い人との会話を楽しみたい, 2:若い世代に貢献したい, 3:仕事や日常の経験を伝えたい, 4:日本語を教えたい"
        integer :desired_condition,       strong: true,
                                          only: User::DESIRED_CONDITIONS,
                                          description: "1:日本語が得意な方がいい, 2:日本語が不得意でも構わない"
      end

      validates :delete do
        integer :user_id,    required: true,
                             description: "user ID"
      end

      # ユーザー一覧 (+ページネーション)
      def list(page = 1)
        page = params[:page] if params[:page].present?
        per_page = params[:per_page].present? ? params[:per_page] : max_user_in_table

        @users_in_device = @current_device.users.paginate(page: page, per_page: per_page)
        @pagination = @users_in_device
      end

      def list_no_specify
        url = devices.present? ? request.path + "/" + devices[0].id.to_s : view_context.org_error_no_contract("device")
        redirect_to url
      end

      # 当該セクションに新しいアカウントを追加
      def create
        email = random_email
        if email.present?
          data = permitted_params
          data[:email] = email
          teacher = Teacher.new(data)
          teacher.password = SecureRandom.urlsafe_base64
          teacher.assign_hobbies  = filtered_nums(params[:hobbies])
          teacher.assign_purposes = filtered_nums(params[:purposes])

          if teacher.errors.empty? && teacher.save
            users_section = UsersOrganizationSection.new({
              organization_section_id: @current_device.organization_section_id,
              user_id: teacher.id,
            })
            if users_section.save
              redirect_to "/organizations/nhs/users/list"
            else
              rollback_create(teacher)
              flash[:danger] = I18n.t("organization.errors.database_error.title")
            end
          else
            flash[:danger] = error_messages_of(teacher)
          end
        end

        render "new"
      end

      # 当該アカウントの情報を変更し適用する
      def update
        @user.attributes = permitted_params
        @user.assign_hobbies  = filtered_nums(params[:hobbies])
        @user.assign_purposes = filtered_nums(params[:purposes])

        if @user.errors.empty? && @user.save
          redirect_to "/organizations/nhs/users/list"
        else
          flash[:danger] = error_messages_of(@user)
        end

        render "edit"
      end

      protected

      def new_role_user_by(parameters)
        Teacher.new(parameters)
      end

      def find_role_user_by(conditions)
        Teacher.find_by(conditions)
      end

      def permitted_params
        params.permit(:name_ja, :sex, :organization_device_id, :desired_condition)
      end

      def the_dimension(dimension_id = nil)
        @dimension = if dimension_id.present?
                       OrganizationDevice.find_by(id: dimension_id)
                     else
                       OrganizationDevice.find_by(id: params[:dimension_id])
                     end
        @current_device = @dimension

        redirect_to view_context.org_error_no_contract("device") if @current_device.blank?
      end

      def at_max_users_in?(device)
        device.users.count >= max_user_in_dimension
      end

      def available_devices
        if at_max_users_in?(current_staff.organization_device)
          redirect_to view_context.org_user_list_path(@role_type)
        else
          @available_devices ||= [current_staff.organization_device]
        end
      end

      def the_hobbies
        @hobbies = Hobby.by_teacher.all
      end

      def the_purposes
        @purposes = Purpose.by_teacher.all
      end

      def the_at_max_users
        @at_max_users = at_max_users_in?(@current_device)
      end

      def before_the_dimension
        params[:dimension_id] = params[:organization_device_id] if params[:organization_device_id].present?
      end

      def to_invalid_device
        redirect_to "/organizations/nhs/users/new"
      end
    end
  end
end
