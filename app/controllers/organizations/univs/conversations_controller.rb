module Organizations
  module Univs
    class ConversationsController < ::Organizations::Users::ConversationsController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Univs

      validates :reserve do
        integer :user_id,                    required: true,
                                             description: "時間を開けるユーザー"
        integer :reservable_conversation_id, required: true,
                                             description: "予約したいシニア空き時間"
        integer :dimension_id,               required: true,
                                             description: "時間を開けるユーザーが属しているorganization_section_id"
      end

      def index
        @q = Conversation.includes(student: :organizations).where(organizations: {id: current_staff.organization.id}).order(start_at: :DESC).ransack(params[:q])
        @all_conversations = @q.result(distinct: true)
        @conversations = @all_conversations.page(params[:page]).per(50)
        respond_to do |format|
          format.html
          format.csv do
            generate_csv(@all_conversations, controller_name)
          end
        end
      end

      def new
        super

        end_at = @start_at + Conversation::DURATION

        @user = User.find_by(id: @user_id)
        rcs = ReservableConversation.visible.start_at_by(@start_at).where("? <= end_at", end_at)
        reservable_conversation = rcs.max_by{|rc| @user.score(rc.user) }

        return if reservable_conversation.blank?

        redirect_to view_context.org_conversation_before_reserve_path(
          role_type,
          reservable_conversation.id,
          @user_id,
          current_dimension.id,
          @start_at.to_s
        )
      end

      # TODO ユーザーエラーへの対応がない
      # TODO 予約が先取りされていた場合のエラー対応がない
      def confirm_before_reserve
        @current_dimension = current_dimension
        @user = User.find_by(id: params[:user_id])
        @reservable_conversation = ReservableConversation.visible.find_by(id: params[:reservable_conversation_id])
        @start_at = Time.zone.parse(params[:start_at])
        @end_at = @start_at + Conversation::DURATION
      end

      # TODO ユーザーエラーへの対応がない
      # TODO 予約が先取りされていた場合のエラー対応がない
      def reserve
        user = User.find_by(id: params[:user_id])

        service = ConversationReserveService.new
        service.reserve_by_reservable_conversation_id(user, params[:reservable_conversation_id])

        redirect_to view_context.org_conversations_calendar_path(role_type, params[:dimension_id])
      end

      protected

      def participants
        @participants ||= current_dimension.users
      end

      # @deprecated
      def current_dimension
        @current_dimension ||= OrganizationSection.find_by(id: params[:dimension_id])
        @current_section = @current_dimension
      end

      # @deprecated
      def dimensions
        [current_staff.organization_section]
      end

      # @deprecated
      def dimension(id)
        @dimension ||= OrganizationSection.find_by(id: id)
      end

      private
      def generate_csv(records,controller_name)
        columns = controller_name.singularize.capitalize.constantize.column_names
        csv_data = CSV.generate do |csv|
          csv << columns
          records.each do |record|
            csv << columns.map {|m| eval("record.#{m}")}
          end
        end
        send_data(csv_data,filename: "#{controller_name}_list_#{Time.now.strftime('%Y_%m_%d')}.csv")
      end
    end
  end
end
