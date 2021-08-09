module Api
  module V1
    class ApiController < ActionController::API
      include ::ActionController::Serialization

      include ::Api::V1::Concerns::Authenticator
      include ::Api::V1::Concerns::ErrorHandler
      include ::Api::V1::Concerns::VersionExpirationHandler
      include ::Api::V1::Concerns::Internationalizator
    end
  end
end
