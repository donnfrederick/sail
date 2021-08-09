class ConversationStatusCheckService < ApplicationService
  attr_reader :conversation

  def self.check_all
    Conversation.current.scheduled.find_each {|c| new(c).check! }
  end

  def initialize(conversation)
    @conversation = conversation
  end

  def check!
    if conversation.current? && !conversation.talked? && seemingly_talking?
      conversation.progress!
    end
  end

  def teacher
    @teacher ||= conversation.teacher
  end

  def student
    @student ||= conversation.student
  end

  private

    def seemingly_talking?
      channel_clients.count > 1 && channel_clients.map(&:minutes).min > 0
    end

    def channel_clients
      @channel_clients ||= Sora::Connection.request_connection_peers(conversation.channel_id)
    end
end
