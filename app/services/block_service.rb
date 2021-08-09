class BlockService < ApplicationService
  attr_reader :blocker_user, :blocked_user, :block_record

  def initialize(blocker_user)
    @blocker_user = blocker_user
    @blocked_user = nil
  end

  def block(blocked_user)
    @blocked_user = blocked_user

    ActiveRecord::Base.transaction do
      blocker_user.unfavorite(blocked_user)
      @block_record = blocker_user.block(blocked_user)
      cancel_upcoming_conversations

      reject_conversation_requests || cancel_conversation_requests
      blocker_user.notifications.by_related_user(blocked_user).nullify_all
    end
  end

  def errors
    conversation.errors
  end

  private

    def cancel_upcoming_conversations
      conversations = if blocker_user.teacher?
                        blocker_user.conversations.queued.by_student_id(blocked_user.id)
                      else
                        blocker_user.conversations.queued.by_teacher_id(blocked_user.id)
                      end
      conversations.each do |conversation|
        service = ConversationCancelService.new conversation
        service.cancel_by_user(blocker_user, false)
      end
    end

    def reject_conversation_requests
      return if blocker_user.student?

      requests = ConversationRequest.available.
        by_user_id(blocked_user.id).
        by_conversation_id(blocker_user.conversations.map(&:id))

      requests.reject_all

      requests.each do |conversation_request|
        Notification.notify_conversation_with_request_cancelled_to_teacher(conversation_request)
        Notification.notify_conversation_with_request_cancelled(conversation_request)
      end
    end

    def cancel_conversation_requests
      return if blocker_user.student?

      requests = ConversationRequest.available.
        by_user_id(blocker_user.id).
        by_conversation_id(blocked_user.conversations.map(&:id))

      requests.each do |request|
        service = RequestCancellationService.new(request)
        service.cancel
      end
    end
end
