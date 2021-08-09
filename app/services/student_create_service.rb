class StudentCreateService < ApplicationService
  attr_reader :student

  def initialize(params)
    @student = Student.new(params)
  end

  def assign_hobbies(hobbies)
    student.assign_hobbies = hobbies
  end

  def assign_purposes(purposes)
    student.assign_purposes = purposes
  end

  def assign_picture(picture)
    student.assign_picture = picture
  end

  def create
    # WARNING: 下記で該当するFCMトークンを持つユーザーが同一デバイスではない可能性を下記は考慮していません。
    cleanup_existing_fcm_tokens(student.fcm_token) if student.fcm_token.present?

    if student.save
      # student.follow_up!
      give_initial_package!
      send_thanks_email
      true
    else
      false
    end
  end

  def errors
    student.errors
  end

  private

  def cleanup_existing_fcm_tokens(fcm_token)
    User.where(fcm_token: fcm_token).update_all(fcm_token: nil)
  end

  def send_thanks_email
    student.send_thanks_registration
  rescue => e
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
  end

  def give_initial_package!
    property = PackageProperty.new({
                          original_price: "0",
                          discounted_price: "",
                          original_conversations: "3",
                          bonus_conversations: "0"
                        })
    property.duration = SiteConfig.find_by_keyword("user.student.payment.trial.duration", 1)
    property.term = SiteConfig.find_by_keyword("user.student.payment.trial.term", "month")

    issue_service = IssueCreateService.new(student)
    issue_service.create_free!(property)
  end
end
