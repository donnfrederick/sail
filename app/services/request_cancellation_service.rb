class RequestCancellationService < ApplicationService
  attr_reader :conversation_request

  def initialize(conversation_request)
    @conversation_request = conversation_request
  end

  def cancel
    conversation_request.destroy
    Notification.notify_request_cancelled(conversation_request)
  end
end
