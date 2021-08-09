class ConversationCreateService < ApplicationService
  attr_reader :teacher, :conversation
  attr_accessor :validate

  def initialize(teacher)
    @teacher = teacher
    @conversation = nil
    @validate = true
  end

  def create(start_at, end_at, accepting_requests = false)
    @conversation = Conversation.new(
      status: Conversation::STATUS_WAITING,
      teacher_id: teacher.id,
      start_at: start_at,
      end_at: end_at,
      accepting_requests: accepting_requests,
    )

    ok = @conversation.save(validate: validate)
    if ok
      create_reservable_conversations
      try_match_waiting_student
    end

    ok
  end

  def errors
    conversation.errors
  end

  def start_at
    @start_at ||= conversation.start_at
  end

  def end_at
    @end_at ||= conversation.end_at
  end

  private

    def try_match_waiting_student
      conversation.ambush_conversation(teacher)
    end

    def create_reservable_conversations
      rs = []
      Conversation.starting_times(start_at, end_at).each do |time|
        rs << ReservableConversation.new(
          conversation: conversation,
          user:         teacher,
          start_at:     time,
          end_at:       (time.to_datetime + Conversation::DURATION),
        )
      end

      ReservableConversation.import rs
    end
end
