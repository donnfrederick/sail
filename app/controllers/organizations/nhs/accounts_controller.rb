module Organizations
  module Nhs
    # @deprecated
    class AccountsController < ::Organizations::Users::AccountsController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs

      def index
        @organization = current_staff.organization
        @accounts ||= [current_staff]
        @staffs ||= [current_staff]
      end
    end
  end
end
