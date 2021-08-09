class ConversationCancelService < ApplicationService
  attr_reader :conversation, :original_accepting_requests, :canceller_user

  def initialize(conversation)
    @conversation = conversation
    @original_accepting_requests = if conversation.student.nil?
                                     conversation.accepting_requests
                                   else
                                     conversation.requests.count > 0
                                   end
  end

  def cancel_by_user(canceller_user, notify_both = true)
    @canceller_user = canceller_user
    ActiveRecord::Base.transaction do
      conversation.reload
      unless conversation.status_cancelled?
        conversation.cancel_by(canceller_user.type.downcase)
        Notification.notify_conversation_cancelled(conversation, canceller_user, notify_both)
        notify_all_rejected_users

        restore_teacher_conversation if canceller_user.student?
      end

      true
    end
  end

  def cancel_by_admin(notify = true, restore: false)
    ActiveRecord::Base.transaction do
      conversation.reload
      unless conversation.status_cancelled?
        conversation.cancel_by(:admin)
        Notification.notify_conversation_cancelled_by_admin(conversation) if notify
        notify_all_rejected_users

        restore_teacher_conversation if restore
      end

      true
    end
  end

  def past?
    @conversation.past?
  end

  def errors
    @conversation.errors
  end

  private

    def try_match_waiting_student
      conversation.ambush_conversation(teacher)
    end

    def notify_all_rejected_users
      conversation.requests.rejected.each do |r|
        Notification.notify_request_rejected(r)
      end
    end

    def restore_teacher_conversation
      return if conversation.nil? || (canceller_user.present? && canceller_user.teacher?)

      create_service = ConversationCreateService.new(conversation.teacher)
      create_service.create(conversation.start_at, conversation.end_at, original_accepting_requests)

      notify_reopen_to_candidates
    end

    def notify_reopen_to_candidates
      return if conversation.nil? || (canceller_user.present? && canceller_user.teacher?)
      return if conversation.requests.count == 0

      rejected_candidates = if canceller_user.nil?
                              conversation.requests
                            else
                              conversation.requests.reject {|r| r.from_user == canceller_user }
                            end

      rejected_candidates.each do |rejected_candidate|
        student = rejected_candidate.from_user
        Notification.notify_conversation_reopened(conversation, student)
      end
    end
end
