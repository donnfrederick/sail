module Organizations
  module Nhs
    #
    # 取り扱うべきセクションを切り替える処理を実装します。
    #
    # このコントローラーには画面はありません。
    #
    class SectionsController < BaseController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs

      before_action :section

      def show
        session[:current_section_id] = section.id if section.present?
        redirect_to params[:url]
      end

      # ちょっと趣向の違うupdateなので注意：特権ありagentの場合にorganization下のstaffすべてを管理下に置く
      # あとでstaffが作成された場合に管理情報を更新する意味でupdate
      def update
        if agent.privileged?
          all_section_ids = current_organization.organization_sections.map(&:id)
          all_device_ids = OrganizationDevice.where(organization_section_id: all_section_ids).pluck(:id)
          all_staff_ids = OrganizationStaff.where(organizaation_device_id: all_device_ids).pluck(:id)
          all_staff_ids.each do |staff_id|
            data = { organization_agent_id: agent.id, organization_staff_id: staff_id }
            agent_staff_ = OrganizationAgentsStaff.find_by(data)
            if agent_staff_.blank?
              agent_staff_ = OrganizationAgentsStaff.new(data)
              agent_staff_.save!
            end
          end
        end

        redirect_to view_context.org_path(role_type)
      end

      protected

      def section
        @section ||= OrganizationSection.find_by(id: params[:organization_section_id])
      end
    end
  end
end
