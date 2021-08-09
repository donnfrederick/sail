module Webhook
  module V1
    class WebhookController < ActionController::API
      include ::Api::V1::Concerns::ErrorHandler
      include ::Api::V1::Concerns::VersionExpirationHandler
    end
  end
end
