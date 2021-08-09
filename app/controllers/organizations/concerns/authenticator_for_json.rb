module Organizations
  module Concerns
    module AuthenticatorForJson
      extend ActiveSupport::Concern

      def auth_with_session!
        render json: { error: 400, message: "unauthorized" } unless staff_signed_in?
      end

      def redirect_to_signin
        render json: { error: 503, message: "server operation confused" }
      end
    end
  end
end
