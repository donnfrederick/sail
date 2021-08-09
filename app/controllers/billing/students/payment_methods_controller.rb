module Billing
  module Students
    class PaymentMethodsController < ApplicationController
      layout "billing"

      include ::Billing::Students::Concerns::Authenticator

      def index
        @title = "Payment methods"
        @back_url = "/billing/students/points/overview/#{student.auth_token}"
      end
    end
  end
end
