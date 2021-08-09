class ConversationFinishService < ApplicationService
  attr_reader :conversation

  def initialize(conversation)
    @conversation = conversation
  end

  def complete!
    conversation.completed!
    Sora::Recording.stop(conversation.channel_id)

    # Notification.notify_follow_up_next_reservation(conversation, :teacher)

    # conversation.users.each do |user|
    #   user.unfollow_up! if should_be_unfollowed_up?(user)
    #   user.unprivilege! if !conversation.absent?(user.type.downcase) && has_good_experiences?(user)
    # end
  end

  def fail!
    conversation.finalize_status!
    teacher.enable_notify_absence if conversation.absent?(:teacher)
    student.enable_notify_absence if conversation.absent?(:student)

    if conversation.failed_because_of?(:teacher)
      compensation(:student)
    elsif !conversation.absent?(:teacher)
      compensation(:teacher)
    end

    conversation.users.each do |user|
      user.privilege! if !conversation.absent?(user.type.downcase) && has_bad_experiences?(user)
    end
    restrict_suspicious_users
  end

  def close!
    conversation.unmatched! if conversation.status_waiting?
  end

  def student
    @student ||= conversation.student
  end

  def teacher
    @teacher ||= conversation.teacher
  end

  private

    def has_bad_experiences?(user)
      unfortunate_times = if user.tutor?
                            SiteConfig.find_by_keyword("user.#{user.type.downcase}.privilege_condition.tutor", "15").to_i
                          else
                            SiteConfig.find_by_keyword("user.#{user.type.downcase}.privilege_condition.regular", "2").to_i
                          end

      user.has_bad_experiences?(unfortunate_times)
    end

    def has_good_experiences?(user)
      condition = if user.tutor?
                    SiteConfig.find_by_keyword("user.#{user.type.downcase}.unprivilege_condition.tutor", "1").to_i
                  else
                    SiteConfig.find_by_keyword("user.#{user.type.downcase}.unprivilege_condition.regular", "1").to_i
                  end

      user.has_good_experiences?(condition)
    end

    def should_be_suspicious?(user)
      condition = if user.tutor?
                    SiteConfig.find_by_keyword("user.#{user.type.downcase}.suspicious_condition.tutor", "2").to_i
                  else
                    SiteConfig.find_by_keyword("user.#{user.type.downcase}.suspicious_condition.regular", "2").to_i
                  end

      user.serial_absent?(condition)
    end

    def restrict_suspicious_users
      conversation.users.each do |user|
        if should_be_suspicious?(user)
          service = SuspiciousUserSetService.new(user)
          service.set
        elsif user.suspicious?
          service = SuspiciousUserUnsetService.new(user)
          service.unset
        end
      end
    end

    def should_be_unfollowed_up?(user)
      return false unless user.followed_up?

      condition = if user.tutor?
                    SiteConfig.find_by_keyword("user.#{user.type.downcase}.remove_follow_up.tutor", "1").to_i
                  else
                    SiteConfig.find_by_keyword("user.#{user.type.downcase}.remove_follow_up.regular", "1").to_i
                  end

      user.serial_absent?(condition)
    end

    def compensation(user_type)
      if conversation.send(user_type).student?
        # NOTE: 誰に対してのcompensationかがコードに表れていないので拡張性に難が出そう
        RetrievedPointTransaction.create!(
            conversation: conversation,
            )
        Notification.notify_conversation_points_retrieved_because_of_absence(conversation, :teacher)
      else
        Notification.notify_follow_up_next_reservation_with_sorry(conversation, :teacher)
      end
    end
end
