module Api
  module V1
    module Billing
      module Students
        class IssuesController < ApiController
          def available
            render json: {
              issues: current_user.available_issues.map {|i| IssueSerializer.new i },
              lang: current_user.language,
              gracing: current_user.conversations.queued.exists? || current_user.conversation_requests.available.exists?
            }
          end
        end
      end
    end
  end
end
