module Api
  module V1
    class IssuesController < ApiController
      before_action :set_stripe_api_key, only: [:create]
      before_action :auth_with_token!

      validates :create do
        string :token, description: "Stripe.jsでの支払い処理トークン"
        string :package, required: true, description: "購入パッケージのIDを指定します。"
        string :code, required: false, description: "クーポンコードがある場合は指定します。"
      end

      def create
        render json: subscribe, status: :ok
      end

      def pk
        render json: SiteConfig.find_by_keyword("payment.stripe.api_public_key") || ENV["STRIPE_API_PUBLIC_KEY"], status: :ok
      end

      def packages
        render json: PackageProperty.find(290)
      end

      private
      def set_stripe_api_key
        ::Stripe.api_key = SiteConfig.find_by_keyword("payment.stripe.api_secret_key") || ENV["STRIPE_API_KEY"]
      end

      def subscribe
        begin
          @customer = ::Stripe::Customer.create(customer_create_params)
          subscription = ::Stripe::Subscription.create(subscription_create_params)
          issue_service = IssueCreateService.new(current_user)
          issue_service.create_by_stripe_subscription!(package, subscription).succeeded? ? {status: 'success', msg: 'ok'} : {status: 'fail', msg: 'failed'}
        rescue => e
          {status: 'error', msg: e.message}
        end
      end

      def customer_create_params
        { email: current_user.email, description: package.description, source: token }
      end

      def subscription_create_params
        { customer: @customer.id, plan: package.stripe_data_id }
      end

      def token
        @token ||= params[:token]
      end

      def package
        @package ||= PackageProperty.find(params[:package])
      end

    end
  end
end
