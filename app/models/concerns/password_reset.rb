module PasswordReset
  extend ActiveSupport::Concern

  included do
    SERVICE_HOST ||= ENV["APP_SERVICE_HOST"].freeze
    EXPIRY_TIME  ||= Settings.users.reset_digest_expiry_time
    
    scope :by_digest, ->(digest) {
      where(password_reset_digest: digest).where("? < password_reset_sent_at", Time.zone.now - EXPIRY_TIME)
    }
  end

  def create_reset_digest
    update_attributes(
      password_reset_digest:  self.class.generate_token,
      password_reset_sent_at: Time.zone.now,
    )
  end

  def update_password_with_reset_digest(new_password)
    update_attributes(
      password:               new_password,
      password_reset_digest:  nil,
      password_reset_sent_at: nil,
    )
  end

  # TODO: update password と transaction
  def nullify_reset_digest
    update_attributes(
      password_reset_digest:  nil,
      password_reset_sent_at: nil,
    )
  end

  def send_password_reset_email
    klass = "#{self.class.name}Mailer".constantize
    klass.password_reset(self).deliver_now
  end

  def password_reset_url
    File.join(SERVICE_HOST, self.model_name.plural, 'password_renew', self.password_reset_digest)
  end

  module ClassMethods
    def generate_token
      SecureRandom.urlsafe_base64
    end
  end
end

