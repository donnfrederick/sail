class ConversationRequestCreateService < ApplicationService
  attr_reader :student, :conversation_request, :reservable_conversation

  def initialize(student)
    @student = student
    @conversation_request = nil
    @reservable_conversation = nil
  end

  # @throws ActiveRecord::RecordNotFound
  def create_by_id(id)
    @reservable_conversation = ReservableConversation.visible.find(id)
    if !@reservable_conversation.conversation.accepting_requests? || student.blocks?(teacher) || teacher.blocks?(student)
      raise ActiveRecord::RecordNotFound
    end

    ConversationRequest.transaction do
      @conversation_request = ConversationRequest.create!(
        conversation_id: @reservable_conversation.conversation_id,
        from_user_id: student.id,
        start_at: @reservable_conversation.start_at,
      )
      Notification.notify_request_created(@conversation_request)
    end
  end

  def errors
    @conversation_request.errors
  end

  def teacher
    @teacher ||= reservable_conversation.conversation.teacher
  end
end
