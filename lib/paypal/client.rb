module Paypal
  class Client
    attr_reader :response

    def self.client_id
      SiteConfig.find_by_keyword("payment.paypal.api_client_id") || ENV["PAYPAL_API_CLIENT_ID"]
    end

    def status
      response.try(:status)
    end

    def error?
      status.present? && !ok?
    end

    def ok?
      status.present? && status >= 200 && status < 300
    end

    def pended?
      status.nil?
    end

    def result
      response.try(:body)
    end

    def authenticate
      client_id = Client.client_id
      secret = SiteConfig.find_by_keyword("payment.paypal.api_secret_key") || ENV["PAYPAL_API_SECRET_KEY"]

      result = get_json("/v1/oauth2/token", [
                          sprintf("-u \"%s:%s\"", client_id, secret),
                          "-d \"grant_type=client_credentials\"",
                        ])

      result["access_token"] if result.present?
    end

    def access_token
      @access_token ||= authenticate
    end

    def get_order(order_id)
      get_json("/v2/checkout/orders/#{order_id}", [
        sprintf("-H \"Authorization: Bearer %s\"", access_token),
      ])
    end

    def create_product!(product_hash, request_id = nil)
      api_post("/v1/catalogs/products", product_hash, request_id)
    end

    def api_prefix
      SiteConfig.find_by_keyword("payment.paypal.api_url") || ENV["PAYPAL_API_URL"]
    end

    def api_get(url_relative, body_hash, request_id = nil, headers: [])
      conn = Faraday.new(url: "#{api_prefix}#{url_relative}", params: body_hash)
      @response  = conn.get do |req|
        req.headers["Content-Type"] = "application/json"
        req.headers["Authorization"] = "Bearer #{access_token}"
        req.headers["PayPal-Request-Id"] = "#{request_id}" if request_id.present?
        req.headers.merge! headers
      end

      if error?
        error = ApiError.build(JSON.parse(result, symbolize_names: true))
        raise error
      elsif result.present?
        JSON.parse(result, symbolize_names: true)
      end
    end

    def api_post(url_relative, body_hash, request_id = nil, headers: [])
      conn = Faraday.new(url: "#{api_prefix}#{url_relative}")
      @response  = conn.post do |req|
        req.headers["Content-Type"] = "application/json"
        req.headers["Authorization"] = "Bearer #{access_token}"
        req.headers["PayPal-Request-Id"] = "#{request_id}" if request_id.present?
        req.headers.merge! headers
        req.body = body_hash.to_json
      end

      if error?
        error = ApiError.build(JSON.parse(result, symbolize_names: true))
        raise error
      elsif result.present?
        JSON.parse(result, symbolize_names: true)
      end
    end

    def api_patch(url_relative, body_hash, request_id = nil, headers: [])
      conn = Faraday.new(url: "#{api_prefix}#{url_relative}")
      @response  = conn.patch do |req|
        req.headers["Content-Type"] = "application/json"
        req.headers["Authorization"] = "Bearer #{access_token}"
        req.headers["PayPal-Request-Id"] = "#{request_id}" if request_id.present?
        req.headers.merge! headers
        req.body = body_hash.to_json
      end

      if error?
        error = ApiError.build(JSON.parse(result, symbolize_names: true))
        raise error
      elsif result.present?
        JSON.parse(result, symbolize_names: true)
      end
    end

    def api_delete(url_relative, body_hash = {}, request_id = nil, headers: [])
      conn = Faraday.new(url: "#{api_prefix}#{url_relative}")
      @response  = conn.delete do |req|
        req.headers["Content-Type"] = "application/json"
        req.headers["Authorization"] = "Bearer #{access_token}"
        req.headers["PayPal-Request-Id"] = "#{request_id}" if request_id.present?
        req.headers.merge! headers
        req.body = body_hash.to_json
      end

      if error?
        error = ApiError.build({name: "NOT_FOUND", message: "Status: #{status}"})
        raise error
      elsif result.present?
        JSON.parse(result, symbolize_names: true)
      end
    end

    private

      def get_json(url_relative, opts = [])
        endpoint = "#{api_prefix}#{url_relative}"
        cmd = sprintf("curl %s -H \"Accept: application/json\" -H \"Accept-Language: en_US\" " + opts.join(" "), endpoint)

        json_content = IO.popen(cmd, "r") {|io| io.gets }.try(&:strip)
        if json_content.present?
          JSON.parse(json_content)
        else
          Rails.logger.error "[ERROR] PayPal GET json: #{cmd}"
          nil
        end
      end
  end
end
