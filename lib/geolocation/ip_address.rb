module Geolocation
  class IpAddress
    # @see http://ip-api.com/docs/api:json
    ENDPOINT = "http://ip-api.com/json/".freeze

    def self.lookup(ip_address)
      conn = Faraday.new(url: ENDPOINT + ip_address)
      res  = conn.get

      begin
        if res.present? && res.body.present? && res.body != ""
          Client.new(JSON.parse(res.body))
        end
      rescue => e
        Rails.logger.error e.to_s
        nil
      end
    end
  end
end
