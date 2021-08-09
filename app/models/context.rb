class Context

  def self.instance
    @@context ||= new
  end

  attr_accessor :current_user

  private

    @@context = nil
end
