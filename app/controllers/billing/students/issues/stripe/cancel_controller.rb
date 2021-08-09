module Billing
  module Students
    module Issues
      module Stripe
        class CancelController < ApplicationController
          layout "billing"

          include ::Billing::Students::Concerns::Authenticator

          def new
            @issue = StripeIssue.find(params[:id])
          end

          def create
            issue = StripeIssue.find(params[:id])
            issue.cancel! if issue.subscription?

            redirect_to "/billing/students/points/overview/#{student.auth_token}"
          end
        end
      end
    end
  end
end
