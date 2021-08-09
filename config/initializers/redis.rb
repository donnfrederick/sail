# redis-objects, redis-namespace
if ENV["APP_REDIS_URL"].present?
  uri = URI.parse(ENV["APP_REDIS_URL"])

  Redis.current = Redis::Namespace.new(
    Rails.application.class.parent_name,
    redis: Redis.new(
      host:     uri.host,
      port:     uri.port,
      password: uri.password,
    ),
  )
end
