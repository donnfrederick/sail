class PrivilegeDestroyService < ApplicationService
  attr_reader :privileged_user

  def initialize(privileged_user)
    @privileged_user = privileged_user
  end

  def unprivilege!
    privileged_user.destroy_privilege
  end
end
