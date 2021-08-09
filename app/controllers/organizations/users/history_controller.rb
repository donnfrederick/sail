module Organizations
  module Users
    class HistoryController < ::Organizations::BaseController
      include Concerns::CalendarInternals

      def list(page = 1, per_page = 30)
        @dimensions = dimensions
        @current_dimension = dimension(params[:id])

        unless @current_dimension.present?
          redirect_to view_context.org_error_no_contract(dimension_type)
          return nil
        end

        page = params[:page] if params[:page].present?
        per_page = params[:per_page] if params[:per_page].present?

        @latest_at = params[:latest_at].present? ? Time.zone.parse(params[:latest_at]) : Time.zone.now
        @participants = participants

        user_ids = if current_staff.nursing_house?
                     current_staff.organization_device.users.map(&:id)
                   else
                     current_staff.organization_section.users.map(&:id)
                   end
        @conversations = Conversation.where(teacher_id: user_ids).
            end_at_by(@latest_at).
            finished.
            paginate(page: page, per_page: per_page)
        @pagination = @conversations
        @page = page
      end

      # @deprecated
      def list_no_specify
        dimensions_ = dimensions
        url = if dimensions_.present?
                view_context.org_history_path(@role_type, dimensions_[0].id)
              else
                view_context.org_error_no_contract(dimension_type)
              end
        redirect_to url
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
