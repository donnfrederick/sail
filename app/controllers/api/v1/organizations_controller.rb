module Api
  module V1
    class OrganizationsController < ApiController
      skip_before_action :auth_with_token!

      def users
        if staff_signed_in?
          render json: current_staff.organization_device.users,
                 each_serializer: OrganizationUserSerializer
        else
          head :unauthorized
        end
      end

      private

        def current_staff
          return nil if auth_token.nil?

          @current_staff ||= OrganizationStaff.find_by(auth_token: auth_token)
        end

        def staff_signed_in?
          current_staff.present?
        end

        def auth_scheme
          request.headers["Authorization"].to_s.split(" ").first
        end

        def auth_token
          return nil unless auth_scheme.to_s.match?(/^Bearer/)

          request.headers["Authorization"].to_s.split(" ").last
        end
    end
  end
end
