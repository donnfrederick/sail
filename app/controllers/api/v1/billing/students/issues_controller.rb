module Api
  module V1
    module Billing
      module Students
        class IssuesController < ApiController
          before_action :subscription

          def available
            render json: {
              issues: current_user.available_issues.map {|i| IssueSerializer.new i },
              lang: current_user.language,
              gracing: current_user.conversations.queued.exists? || current_user.conversation_requests.available.exists?
            }
          end 

          def subscription
            issue = Issue.by_user_id(current_user.id)&.last
            if issue.present? && issue.data_id.present? && issue.conversations < 0 && issue.is_a?(PaypalIssue)
              agreement = ::Paypal::Agreement.new({})
              data = agreement.subscription_retrieve!(issue.data_id)
              subscription_update_chk = data[:status] == "ACTIVE" && issue.expired_at <= Time.now && 
                                        data[:billing_info][:next_billing_time].present? && 
                                        data[:billing_info][:next_billing_time] >= Time.now
              if subscription_update_chk
                expired_date = Time.zone.parse(data[:billing_info][:next_billing_time])
                expired_date = expired_date + 1.weeks
                Issue.where(user_id: issue.user_id, data_id: issue.data_id).update(expired_at: expired_date)
              elsif data[:status] == "CANCELLED" && issue.status != Issue::STATUS_CANCELLED
                # paypal userのgrace period (1.weeks)を減算して、更新
                Issue.where(user_id: issue.user_id, data_id: issue.data_id).update(expired_at: issue.expired_at - 1.weeks, status: Issue::STATUS_CANCELLED)
              end
            end
          end
         
        end
      end
    end
  end
end
