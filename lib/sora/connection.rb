module Sora
  class Connection
    ENDPOINT    = ENV["SORA_API_URL"]

    # @see https://sora.shiguredo.jp/doc/API.html#id4
    def self.disconnect_channel(channel_id, reason)
      args = if reason.nil?
               {
                 channel_id:  channel_id,
               }
             else
               {
                 channel_id:  channel_id,
                 reason: reason,
               }
             end
      res = post_api("DisconnectChannel", "20151104", args)

      if res.present? && res.status.present?
        res.status === 200
      else
        false
      end
    rescue => e
      Rails.logger.error "[DisconnectChannel] channel_id: #{channel_id}"
      Rails.logger.error e.to_s
      false
    end

    # @see https://sora.shiguredo.jp/doc/API.html#id7
    def self.disconnect_client(channel_id, client_id, reason)
      args = if reason.nil?
               {
                 channel_id:  channel_id,
                 client_id: client_id,
               }
             else
               {
                 channel_id:  channel_id,
                 client_id: client_id,
                 reason: reason,
               }
             end
      res = post_api("DisconnectConnection", "20151104", args)

      if res.present? && res.status.present?
        res.status === 200
      else
        false
      end
    rescue => e
      Rails.logger.error "[DisconnectConnection] channel_id: #{channel_id}, client_id: #{client_id}"
      Rails.logger.error e.to_s
      false
    end

    # @see https://sora.shiguredo.jp/doc/API.html#id11
    def self.request_connection_peers(channel_id)
      res = post_api("ListChannelClients", "20170814", {
        channel_id:  channel_id,
      })

      if res.present? && res.body.present? && res.body != ""
        JSON.parse(res.body).map do |hash|
          ChannelClient.new hash
        end
      else
        nil
      end
    rescue => e
      Rails.logger.error "[ListChannelClients] channel_id: #{channel_id}"
      Rails.logger.error e.to_s
      nil
    end

    def self.post_api(name, version, args)
      conn = Faraday.new(url: ENDPOINT)
      res  = conn.post do |req|
        req.headers["x-sora-target"] = "Sora_#{version}.#{name}"
        req.body = args.to_json
      end

      Rails.logger.info "[#{name}] #{args.to_s}"
      Rails.logger.info res.body

      res
    end
  end
end
