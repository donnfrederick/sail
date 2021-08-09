class RedisUserAccessLog
  attr_reader :user

  CONTENT_DELIMITER = "\n".freeze

  def initialize(user)
    @user = user
  end

  def append!(request = nil)
    append_object({
                    timestamp: Time.now.strftime("%Y-%m-%dT%H:%M:%SZ"),
                    fullpath: request.nil? ? nil : request.fullpath,
                    user_agent: request.nil? ? nil : request.user_agent,
                  })
  end

  def read_each
    @user.access_log_value.try(:tap) do |access_log_value|
      return
      # return if access_log_value.nil?

      access_log_value.split(CONTENT_DELIMITER).each do |json|
        begin
          object = JSON.parse(json)
          user_access = build_user_access(object)
          yield(user_access, nil)
        rescue => e
          yield(nil, e)
        end
      end
    end
  end

  def clear!
    @user.access_log_value = "" unless @user.access_log_value.nil?
  end

  private

    def append_object(obj)
      if @user.access_log_value.nil?
        @user.access_log_value = obj.to_json + CONTENT_DELIMITER
      else
        @user.access_log_value += obj.to_json + CONTENT_DELIMITER
      end
    end

    def build_user_access(object)
      UserAccess.new.tap do |user_access|
        user_access.user_id = @user.id
        user_access.fullpath = object["fullpath"]
        user_access.user_agent = object["user_agent"]
        user_access.created_at = object["timestamp"]
      end
    end
end
