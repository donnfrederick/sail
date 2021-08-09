module Organizations
  module Users
    class ConversationsController < ::Organizations::BaseController
      include Concerns::CalendarValidators
      include Concerns::CalendarInternals

      def new
        @current_dimension = dimension(params[:dimension_id])
        @start_at = Time.zone.parse(params[:start_at])
        @user_id = params[:user_id]
      end

      def confirm_before_create
        @dimension_id = params[:dimension_id]
        @start_at = Time.zone.parse(params[:start_at])
        @end_at = Time.zone.parse(params[:end_at])
        @user_id = params[:user_id]
      end

      def calendar(offset = 6)
        @dimensions = dimensions
        @current_dimension = dimension(params[:id])

        unless @current_dimension.present?
          redirect_to view_context.org_error_no_contract(dimension_type)
          return nil
        end

        @month = params[:month].present? ? params[:month].to_i : 1
        @this_month = page_of_month(@month).beginning_of_month
        @start_date = start_date_of(@this_month, offset)
        @days = 4
        @first = 8
        @last = 19
        @participants = participants

        @start_date_next_month = start_date_next_of(@this_month, offset)
        @weeks = weeks(@this_month, @start_date_next_month)
        @end_at = @start_date_next_month + (@weeks * 7).days

        @section_schedule = section_schedule_between(@start_date, @end_at)

        @capacity = @participants.length + 3
      end

      def list_no_specify
        dimensions_ = dimensions
        url = if dimensions_.present?
                view_context.org_conversations_calendar_path(@role_type, dimensions_[0].id)
              else
                view_context.org_error_no_contract(dimension_type)
              end
        redirect_to url
      end

      def table(offset = 6)
        @dimensions = dimensions
        @current_dimension = dimension(params[:id])

        unless @current_dimension.present?
          redirect_to view_context.org_error_no_contract(dimension_type)
          return nil
        end

        @month = params[:month].present? ? params[:month].to_i : 1
        @this_month = page_of_month(@month).beginning_of_month
        @start_date = @this_month + 0.days
        @start_date_next_month = @this_month.next_month.beginning_of_month
        @conversations = section_conversations_at(@start_date, @start_date_next_month - 1.seconds)
      end

      def confirm_before_delete
        @user = User.find_by(id: params[:user_id])
        @ambush = params[:ambush].present? ? params[:ambush] != "0" : false
        @conversation = if @ambush
                          AmbushConversation.find_by(id: params[:conversation_id])
                        else
                          Conversation.find_by(id: params[:conversation_id])
                        end
        @dimension = dimension(params[:id])

        return if @conversation.present? && @user.present?

        if params[:id].present?
          redirect_to view_context.org_conversations_calendar_path(@role_type, params[:id])
        else
          redirect_to view_context.org_conversations_path(@role_type)
        end
      end

      def show
        @user = User.find(params[:user_id])
        @conversation = @user.conversations.where(id: params[:conversation_id]).first
        @current_dimension = dimension_by_conversation(@conversation)

        if @conversation.student.nil?
          redirect_to view_context.calendar_url_destroy_by_user(role_type, @user, @conversation.id, @current_dimension, false)
        end
      end

      protected

      def participants
        # 上位クラスで
        []
      end

      # @deprecated
      def dimensions
        # 上位クラスで
        []
      end

      def dimension_by_conversation(_conversation)
        nil
      end

      # @deprecated
      def dimension(id)
        # 上位クラスで
        nil
      end
    end
  end
end
