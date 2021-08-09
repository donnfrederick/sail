module Sora
  class Recording
    ENDPOINT    = ENV["SORA_API_URL"]
    EXPIRE_TIME = Conversation::DURATION.to_i

    def self.start(channel_id, expire_time=EXPIRE_TIME)
      conn = Faraday.new(url: ENDPOINT)
      res  = conn.post do |req|
        req.headers["x-sora-target"] = "Sora_20161101.StartRecording"
        req.body = {
          channel_id:  channel_id,
          expire_time: expire_time,
        }.to_json
      end

      Rails.logger.info "[StartRecording] channel_id: #{channel_id} expire_time: #{expire_time}"
      Rails.logger.info res.body
      res
    end

    def self.stop(channel_id)
      conn = Faraday.new(url: ENDPOINT)
      res  = conn.post do |req|
        req.headers["x-sora-target"] = "Sora_20161101.StopRecording"
        req.body = {
          channel_id:  channel_id,
        }.to_json
      end

      Rails.logger.info "[StopRecording] channel_id: #{channel_id}"
      Rails.logger.info res.body
      res
    end
  end
end
