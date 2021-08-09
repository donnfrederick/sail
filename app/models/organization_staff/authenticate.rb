class OrganizationStaff
  has_secure_password # save to password_digest column
  has_secure_token :auth_token

  validates :email, format: { with: /\A[\w\+\-\_\.]+@[a-z\d\+\-\_\.]+\.[a-z]+\Z/i },
                    length: { maximum: 254 },
                    if: -> { self.email.present? }

  validates :encrypted_email, uniqueness: true,
                              if: -> { self.encrypted_email.present? }

  validates :password, presence: true,
                       length: { minimum: 8, maximum: 72 },
                       format: { with: %r{\A[a-z0-9!"#$%&'()*,\-./:;<>?@\[\\\]\^_`\{|\}~]+\z}i },
                       if: -> { self.password.present? }

  def create_password_digest
    return unless @password

    self.username ||= SecureRandom.uuid
    self.password_digest = OpenSSL::HMAC.hexdigest("md5", @password, self.username)
  end

  # override
  def authenticate(unencrypted_password)
    self.password_digest == OpenSSL::HMAC.hexdigest('md5', unencrypted_password, self.username)
  end

  # override
  def password=(unencrypted_password)
    if unencrypted_password.nil?
      self.password_digest = nil
    elsif !unencrypted_password.empty?
      @password = unencrypted_password

      self.username ||= SecureRandom.uuid
      self.password_digest = OpenSSL::HMAC.hexdigest("md5", @password, self.username)
    end
  end
end
