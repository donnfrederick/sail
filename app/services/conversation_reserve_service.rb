class ConversationReserveService < ApplicationService
  attr_accessor :reservable_conversation, :validate
  attr_writer   :teacher, :student, :conversation, :start_at

  def initialize
    @validate = true
  end

  # @throws ActiveRecord::RecordNotFound
  def reserve_at(teacher, student, start_at)
    @start_at = start_at
    @teacher = teacher
    rc = ReservableConversation.exactly(teacher, start_at).first
    raise ActiveRecord::RecordNotFound if rc.nil?

    reserve_by_reservable_conversation(student, rc)
  end

  # @throws ActiveRecord::RecordNotFound
  def reserve_by_reservable_conversation_id(student, reservable_conversation_id)
    @student = student
    rc = ReservableConversation.visible.find(reservable_conversation_id)

    reserve_by_reservable_conversation(student, rc)
  end

  def reserve_by_reservable_conversation(student, reservable_conversation)
    @student = student
    @reservable_conversation = reservable_conversation

    return false if reservable_conversation.start_at <= Time.now && validate

    conversation.lock!(true)
    Conversation.transaction do
      conversation.status             = Conversation::STATUS_QUEUED
      conversation.start_at           = reservable_conversation.start_at
      conversation.end_at             = reservable_conversation.start_at + Conversation::DURATION
      conversation.student_id         = student.id
      conversation.accepting_requests = false
      conversation.save!(validate: validate)

      Notification.notify_conversation_matched(conversation)
    end
  end

  def past?
    conversation.try(&:past?)
  end

  def errors
    conversation.try(&:errors)
  end

  def conversation
    @conversation ||= @reservable_conversation.conversation
  end

  def teacher
    @teacher ||= @reservable_conversation.user
  end
end
