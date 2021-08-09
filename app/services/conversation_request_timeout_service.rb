class ConversationRequestTimeoutService < ApplicationService
  attr_reader :conversation_request

  def self.timeout_all
    conversations = Conversation.waiting.only_accepting_requests.start_at_by_by(Time.now).includes(:requests)
    conversations.each do |conversation|
      conversation.requests.each {|request| new(request).timeout! }
      conversation.close_waiting
    end
  end

  def initialize(conversation_request)
    @conversation_request = conversation_request
  end

  def timeout!
    conversation_request.reject!
    Notification.notify_request_rejected(conversation_request)
  end
end
