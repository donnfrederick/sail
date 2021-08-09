module Geolocation
  class Client
    attr_reader :query, :status,
                :country, :country_code, :region, :region_name, :city, :zip,
                :lat, :lon,
                :timezone, :isp, :isp_organization

    def initialize(ip_api_result_hash)
      variables = [
        :query, :status,
        :country, :country_code, :region, :region_name, :city, :zip,
        :latitude, :longitude,
        :timezone, :isp, :isp_organization
      ]
      variables.each do |variable|
        value = ip_api_result_hash[variable.to_s].present? ? ip_api_result_hash[variable.to_s] : nil
        self.instance_variable_set("@" + variable.to_s, value)
      end
    end

    def ip_address
      self.query
    end

    def latitude
      self.lat
    end

    def longitude
      self.lon
    end
  end
end
