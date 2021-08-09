require "cgi"

module Organizations
  module Concerns
    module Authenticator
      extend ActiveSupport::Concern

      included do
        before_action :set_timezone, if: :staff_signed_in?
        before_action :role_type
      end

      def auth_with_session!
        redirect_to_signin unless staff_signed_in?
      end

      def current_staff
        @current_staff ||= OrganizationStaff.find_by(id: session[:staff_id])
      end

      def staff_signed_in?
        current_staff.present?
      end

      def set_timezone
        current_staff.set_timezone
      end

      # メールアドレス、パスワードで認証して現在ユーザーを取得
      def authed_staff_by(email, password)
        staff = OrganizationStaff.by_email_with_downcase(email).first
        if staff && staff.authenticate(password)
          session[:staff_id] = staff.id
        end
        staff
      end

      # セッションを切って現在ユーザーを取得
      def deauthed_staff
        session.delete(:staff_id)
        session.delete(:org_lang)
        session.delete(:current_section_id)
      end

      def redirect_to_signin
        redirect_to "/organizations/?url=" + CGI.escape(request.path)
      end

      protected

      def agent
        return @agent if @agent.present?

        data = { organization_staff_id: current_staff.id }
        @agent = OrganizationAgent.find_by(data)
        if @agent.blank?
          @agent = OrganizationAgent.new(data)
          @agent.save!
        end

        @agent
      end

      def agent_staff
        return @agent_staff if @agent_staff.present?

        data = { organization_staff_id: current_staff.id, organization_agent_id: agent.id }
        @agent_staff = OrganizationAgentsStaff.find_by(data)
        if @agent_staff.blank?
          @agent_staff = OrganizationAgentsStaff.new(data)
          @agent_staff.save!
        end

        @agent_staff
      end

      def role_type
        @role_type ||= if staff_signed_in?
                         if current_staff.nursing_house?
                           "nhs"
                         else
                           "univs"
                         end
                       else
                         "unknown"
                       end
      end
    end
  end
end
