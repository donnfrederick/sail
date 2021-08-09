class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout "mailer"
end

ActionMailer::Base.register_observer(EmailLogObserver.new)
