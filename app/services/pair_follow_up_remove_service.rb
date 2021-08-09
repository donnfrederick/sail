class PairFollowUpRemoveService < ApplicationService
  attr_reader :followed_up_user

  def initialize(followed_up_user)
    @followed_up_user = followed_up_user
  end

  def unfollow_up!
    followed_up_user.destroy_follow_up
    Notification.notify_follow_up_removed(followed_up_user)
  end
end
