module Organizations
  module Univs
    class InvitationsController < ::Organizations::BaseController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Univs

      def new
        @sections = [current_staff.organization_section]
      end

      def create
        data = {
          organization_section_id: params[:section_id],
          organization_staff_id: current_staff.id,
        }

        invitation = Invitation.find_by(data)
        unless invitation.present?
          invitation = Invitation.new(data)
          unless invitation.save
            flash[:danger] = I18n.t("organization.errors.database_error.title")
            redirect_to "/organizations/univs/users/invitations/new"
          end
        end
        @invitation = invitation
      end

      def index
        @invitations = invitations
      end

      def confirm_to_delete
        @invitation = invitation_by_token(params[:token])
      end

      def destroy
        invitation = invitation_by_token(params[:token])
        @invitation = invitation
        invitation.destroy

        redirect_to "/organizations/univs/users/invitations/"
      end

      private

      def invitation_by_token(token)
        invitation = Invitation.find_by(organization_section_id: current_staff.organization_section.id, token: token)
        redirect_to "/organizations/univs/users/invitations/" unless invitation.present?
        invitation
      end

      def invitations
        Invitation.where(organization_section_id: current_staff.organization_section.id).all
      end
    end
  end
end
