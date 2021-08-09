class ConversationRequestApproveService < ApplicationService
  attr_reader :conversation_request, :teacher
  attr_writer :student, :start_at

  def initialize(conversation_request)
    @conversation_request = conversation_request
    @conversation = nil
  end

  # @throws ActiveRecord::RecordNotFound
  def approve_by(teacher)
    @teacher = teacher

    return false unless authorized?

    ActiveRecord::Base.transaction do
      conversation_request.approve!

      service = ConversationReserveService.new
      service.conversation = conversation
      return false unless service.reserve_at(teacher, student, start_at)

      Notification.notify_request_approved(conversation_request)
      notify_all_rejected_users
    end
  end

  def errors
    @conversation_request.errors
  end

  def authorized?
    conversation.teacher == teacher
  end

  def student
    @student ||= conversation_request.from_user
  end

  def conversation
    @conversation ||= @conversation_request.conversation
  end

  def start_at
    @start_at ||= @conversation_request.start_at
  end

  private

    def notify_all_rejected_users
      @conversation.requests.rejected.each do |rc|
        Notification.notify_request_rejected(rc)
      end
    end
end
