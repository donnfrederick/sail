module Billing
  module Students
    module Issues
      class StripeController < ApplicationController
        layout "billing"

        include ::Billing::Students::Concerns::Authenticator

        rescue_from ::Stripe::AuthenticationError, with: :stripe_significant_error
        rescue_from ::Stripe::APIConnectionError, with: :stripe_significant_error
        rescue_from ::Stripe::APIError, with: :stripe_significant_error
        rescue_from ::Stripe::InvalidRequestError, with: :stripe_significant_error
        rescue_from ::Stripe::PermissionError, with: :stripe_significant_error
        rescue_from ::Stripe::RateLimitError, with: :stripe_significant_error
        rescue_from ::Stripe::StripeError, with: :stripe_error

        before_action :set_stripe_api_key, only: [:charge]

        validates :new do
          string :code,         required: false,
                 description: "クーポンコードがある場合は指定します。"
        end

        validates :charge do
          string :stripe_token, description: "Stripe.jsでの支払い処理トークン"
          string :package_name, required: true,
                 description: "購入パッケージのIDを指定します。"
          string :code,         required: false,
                 description: "クーポンコードがある場合は指定します。"
        end

        def new
          # フォームに入力させ、フロントエンドでStripeやPayPalに処理させ
          # トークンだけ#chargeのほうに投げるようにする
          @title = 'Credit card'
          @back_url = "/billing/students/payment_methods/#{student.auth_token}"
          @coupon = available_coupon(params.fetch(:code, nil))
          pricing_table = available_pricing_table(@coupon)
          @packages = pricing_table.packages.map {|package| package.available_for(student) }
          @package_names = pricing_table.package_names
          @stripe_public_key = SiteConfig.find_by_keyword("payment.stripe.api_public_key") || ENV["STRIPE_API_PUBLIC_KEY"]

          removed_indexes = []
          @packages.each_with_index do |package, index|
            removed_indexes << index if package.price <= 0
          end
          @packages = @packages.select {|package| package.price > 0 }
          package_names = []
          @package_names.each_with_index do |name, index|
            package_names << name unless removed_indexes.include?(index)
          end
          @package_names = package_names
        end

        def charge
          package = PackageProperty.find(params[:package_name])

          stripe_token = params[:stripe_token]
          succeeded = if package.subscription?
                        stripe_subscribe(package, stripe_token)
                      else
                        stripe_order(package, stripe_token)
                      end

          if succeeded
            redirect_to "/billing/students/points/overview/#{student.auth_token}"
          else
            redirect_to "/billing/students/issues/stripe/result/#{student.auth_token}"
          end
        end

        def result
          @title = "Payment error"
          @result = if session[:billing_result].nil?
                      "no data"
                    elsif session[:billing_result]
                      "success"
                    else
                      "error " + (session[:billing_result_failure_message].nil? ? "(no data)" : session[:billing_result_failure_message])
                    end
          @back_url = "/billing/students/issues/stripe/new/#{student.auth_token}"
        end

        def stripe_error(exception)
          session[:billing_result] = false
          session[:billing_result_failure_message] = "Failed to issue your purchase: " + exception.message
          redirect_to "/billing/students/issues/stripe/result/#{student.auth_token}"
        end

        def stripe_significant_error(exception)
          slack_notify_error(exception, :system_error)

          session[:billing_result] = false
          session[:billing_result_failure_message] = "Payment server error happened. Now we are checking the problem. Please try it again later. Payment has not been made."
          redirect_to "/billing/students/issues/stripe/result/#{student.auth_token}"
        end

        private

          def set_stripe_api_key
            ::Stripe.api_key = SiteConfig.find_by_keyword("payment.stripe.api_secret_key") || ENV["STRIPE_API_KEY"]
          end

          def slack_notify_error(exception, type)
            message = exception.message
            pretext = exception.class.name.underscore.split("_").join(" ")
            color = if type == :system_error
                      "#ff0000"
                    elsif type == :user_error
                      "#ffd700"
                    else
                      "#708090"
                    end
            slack_webhook_url = SiteConfig.find_by_keyword("billing_error_slack_webhook_url", nil)
            return if slack_webhook_url.nil?

            notifier = Slack::Notifier.new slack_webhook_url

            if context_user_info.present?
              if type == :system_error
                pretext = pretext + "\nPlease contact the below user to follow up."
              end
              pretext = pretext + "\n```\n#{context_user_info}\n```"
            end

            attachments = {
              pretext: pretext,
              text: message,
              color: color,
              footer: "from " + self.class.name
            }
            notifier.post attachments: [attachments]
          end

          def context_user_info
            context_user = Context.instance.current_user

            if context_user.nil?
              nil
            elsif context_user.teacher?
              name = context_user.try(:name_ja) || "(teacher without name_ja)"
              email = context_user.try(:email) || "(no email)"
              "#{name} <#{email}> (teacher id##{context_user.id})"
            elsif context_user.student?
              name = context_user.try(:name_en) || "(teacher without name_en)"
              email = context_user.try(:email) || "(no email)"
              "#{name} <#{email}> (student id##{context_user.id})"
            else
              email = context_user.try(:email) || "(no email)"
              "invalid user type <#{email}> (user id##{context_user.id})"
            end
          end

          def available_coupon(code = nil)
            coupon = if code.present?
                       Coupon.find_by_code(code)
                     else
                       nil
                     end

            coupon || CouponOwner.by_email(student.email).first.try(:coupon)
          end

          def available_pricing_table(coupon)
            coupon.try(:pricing_table) || PricingTable.disconnected.first
          end

          def stripe_order(package, stripe_token)
            # TODO: PackageProductConnectorのようなコネクタを作りラップする
            charge = ::Stripe::Charge.create({
                                             amount: (package.price * 100).to_i,
                                             currency: package.currency,
                                             description: "Sail conversation package", # TODO: 正しい表記
                                             source: stripe_token,
                                             statement_descriptor: package.description,
                                           })

            issue_service = IssueCreateService.new(student)
            issue_service.create_by_stripe_charge!(package, charge)
            CouponOwner.by_email(student.email).update_all(used: true, user_id: student.id)

            session[:billing_result] = issue_service.issue.succeeded?
            session[:billing_result_failure_message] = charge.try(:failure_message)

            issue_service.issue.succeeded?
          end

          def stripe_subscribe(package, stripe_token)
            customer = ::Stripe::Customer.create({
              email: student.email,
              description: package.description,
              source: stripe_token,
                                               })
            subscription = ::Stripe::Subscription.create({
                                                         customer: customer.id,
                                                         plan: package.gateway_plans.stripe.first.data_id,
                                               })

            issue_service = IssueCreateService.new(student)
            issue_service.create_by_stripe_subscription!(package, subscription)
            CouponOwner.by_email(student.email).update_all(used: true, user_id: student.id)

            session[:billing_result] = issue_service.issue.succeeded?
            session[:billing_result_failure_message] = subscription.try(:failure_message)

            issue_service.issue.succeeded?
          end
      end
    end
  end
end
