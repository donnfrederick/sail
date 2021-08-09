class Organizations::Api::V1::ApiController < ::ApplicationController
  include ::Api::V1::Concerns::ErrorHandler

  respond_to :json

  rescue_from WeakParameters::ValidationError do
    head 400
  end
end