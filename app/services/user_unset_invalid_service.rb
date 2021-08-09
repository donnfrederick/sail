class UserUnsetInvalidService < ApplicationService
  attr_reader :valid_user

  def initialize(valid_user)
    @valid_user = valid_user
  end

  def valid_as_not_foreigner!
    valid_user.update!(invalid_as_foreigner: false)
  end

  def valid_as_not_ridiculous!
    valid_user.update!(invalid_as_ridiculous: false)
  end
end
