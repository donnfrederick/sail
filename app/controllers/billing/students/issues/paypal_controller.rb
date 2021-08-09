module Billing
  module Students
    module Issues
      class PaypalController < ApplicationController
        layout "billing"

        include ::Billing::Students::Concerns::Authenticator

        validates :charge do
          string :order_id,     description: "PayPal order ID"
          string :package_name, required: true,
                                description: "購入パッケージの名称を指定します。"
          string :code,         required: false,
                                description: "クーポンコードがある場合は指定します。"
        end

        def new
          @title = "PayPal"
          @back_url = "/billing/students/payment_methods/#{student.auth_token}"
          @coupon = available_coupon(params.fetch(:code, nil))
          pricing_table = available_pricing_table(@coupon)
          @packages = pricing_table.packages.map {|package| package.available_for(student) }
          @package_names = pricing_table.package_names
          @featured_package = @packages.fetch(@packages.length - 2)
          @selected_package = if params[:package_name].nil?
                                @featured_package
                              else
                                @packages.find {|p| "#{p.id}" === params[:package_name] }
                              end

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
          paypal = ::Paypal::Client.new
          paypal_order = paypal.get_order(params[:order_id])
          package = PackageProperty.find(params[:package_name])

          if paypal_order.nil?
            session[:billing_result] = false
            session[:billing_result_failure_message] = "PayPal has failed. Please try again."
            redirect_to "/billing/students/issues/paypal/result/#{student.auth_token}"
          end

          begin
            issue_service = IssueCreateService.new(student)
            issue_service.create_by_paypal_order!(package, paypal_order)

            session[:billing_result] = issue_service.issue.succeeded?
            session[:billing_result_failure_message] = paypal_order["status"]

            if issue_service.issue.succeeded?
              CouponOwner.by_email(student.email).update_all(used: true, user_id: student.id)
              redirect_to "/billing/students/points/overview/#{student.auth_token}"
            else
              redirect_to "/billing/students/issues/paypal/result/#{student.auth_token}"
            end
          rescue BraintreeHttp::HttpError => ioe
            Rails.logger.error "[PayPal] http response = #{ioe.status_code}"
            Rails.logger.error "[PayPal] debug_id = #{ioe.headers["debug_id"]}"
            redirect_to "/billing/students/points/overview/#{student.auth_token}"
          rescue => e
            Rails.logger.error "[PayPal] exception: #{e.message}"
            redirect_to "/billing/students/points/overview/#{student.auth_token}"
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
          @back_url = "/billing/students/issues/paypal/new/#{student.auth_token}"
        end

        def destroy
          issue = PaypalIssue.find(params[:id])
          if issue.agreement?
            agreement = issue.agreement
            agreement.cancel!("Cancelled by #{student.name_en} at #{Time.now.to_s}")
          end

          redirect_to "/billing/students/points/overview/#{student.auth_token}"
        end

        private

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
      end
    end
  end
end
