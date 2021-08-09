class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    current_user.appear unless current_user.online?
  end

  def unsubscribed
    current_user.disappear if current_user.online?
  end
end
