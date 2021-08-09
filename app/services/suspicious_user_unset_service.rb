class SuspiciousUserUnsetService < ApplicationService
  attr_reader :suspicious_user

  def initialize(suspicious_user)
    @suspicious_user = suspicious_user
  end

  def unset
    suspicious_user.unsuspicious!
  end
end
