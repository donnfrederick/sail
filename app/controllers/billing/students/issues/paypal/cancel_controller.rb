module Billing
  module Students
    module Issues
      module Paypal
        class CancelController < ApplicationController
          layout "billing"

          include ::Billing::Students::Concerns::Authenticator

          def new
            @issue = PaypalIssue.find(params[:id])
          end

          def create
            issue = PaypalIssue.find(params[:id])
            issue.cancel!
            # "Cancelled by #{student.name_en} at #{Time.now.to_s}"

            redirect_to "/billing/students/points/overview/#{student.auth_token}"
          end
        end
      end
    end
  end
end
