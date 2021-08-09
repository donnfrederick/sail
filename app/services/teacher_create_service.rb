class TeacherCreateService < ApplicationService
  attr_reader   :teacher
  attr_accessor :remote_ip

  def initialize(params)
    @teacher = Teacher.new(params)
  end

  def assign_hobbies(hobbies)
    teacher.assign_hobbies = hobbies
  end

  def assign_purposes(purposes)
    teacher.assign_purposes = purposes
  end

  def assign_picture(picture)
    teacher.assign_picture = picture
  end

  def create
    Teacher.transaction do
      teacher.save!
      restrict_foreign_access
    end

    send_thanks_email
    true
  end

  def errors
    teacher.errors
  end

  private

    def restrict_foreign_access
      return if remote_ip.nil?

      client = Geolocation::IpAddress.lookup(remote_ip)
      if client.present? && client.country != "Japan"
        teacher.invalid_as_foreigner!
      end
    end

    def send_thanks_email
      teacher.send_thanks_registration
    rescue => e
      Rails.logger.error e.message
      Rails.logger.error e.backtrace.join("\n")
    end
end
