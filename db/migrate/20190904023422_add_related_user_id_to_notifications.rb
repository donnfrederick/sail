class AddRelatedUserIdToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_reference :notifications, :related_user, foreign_key: { to_table: :users }
  end

  def data
    Notification.individual.find_each do |notification|
      related_user = if notification.user.nil? || notification.conversation.nil?
                       nil
                     elsif notification.user.teacher?
                       notification.conversation.student
                     elsif notification.user.student?
                       notification.conversation.teacher
                     end

      notification.update(related_user: related_user) if related_user.present?
    end
  end
end
