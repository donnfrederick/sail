module Billing
  module Students
    class PointsController < ApplicationController
      layout "billing"

      include ::Billing::Students::Concerns::Authenticator

      def overview
        @title = "Plan status"
        @back_url = "/students/mypage"
        @packages = IndividualStudentPackage.available_for_user(student).for_sale.all
      end
    end
  end

end
