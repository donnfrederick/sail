class UserSetInvalidService < ApplicationService
  attr_reader :invalid_user

  def initialize(invalid_user)
    @invalid_user = invalid_user
  end

  # @deprecated
  def set_invalid_as_foreigner
    invalid_user.update!(invalid_as_foreigner: true)
    invalid_user.follow_up!
  end

  def invalid_as_foreigner!
    set_invalid_as_foreigner
  end

  # @deprecated
  def set_invalid_as_ridiculous
    invalid_user.update!(invalid_as_ridiculous: true)
    invalid_user.follow_up!
  end

  def invalid_as_ridiculous!
    set_invalid_as_ridiculous
  end
end
