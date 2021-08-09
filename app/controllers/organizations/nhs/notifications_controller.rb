module Organizations
  module Nhs
    class NotificationsController < ::Organizations::Users::NotificationsController
      include Concerns::Language
      include Concerns::Industries
      include Concerns::Nhs

      before_action :the_notification, only: :show

      protected

      def the_notification
        @notification = Notification.find_by(id: params[:notification_id])
      end
    end
  end
end
