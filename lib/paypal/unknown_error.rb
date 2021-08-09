module Paypal
  class UnknownError < ApiError
    attr_reader :name
  end
end
