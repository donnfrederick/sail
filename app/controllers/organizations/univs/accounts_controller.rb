module Organizations
  module Univs
    class AccountsController < ::Organizations::Users::AccountsController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Univs

      def index
        @organization = current_staff.organization
        @accounts = [current_staff]
      end
    end
  end
end
