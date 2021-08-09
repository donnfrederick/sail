class NotificationJobService < ApplicationService
  def self.perform_jobs
    job_count = 0
    Notification.available.sent(false).by_now.find_each do |notification|
      sleep 1 if job_count % 7 === 0
      service = MixNotificationService.new notification
      service.send
      job_count += 1
    end
  end
end
