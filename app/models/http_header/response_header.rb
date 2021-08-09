module HTTPHeader
  class ResponseHeader
    attr_reader :response

    def initialize(response, headers = {})
      @response = response
      @headers = headers
    end

    def append(key, value)
      @headers[key] = [] unless @headers[key].present?
      @headers[key] << value
    end

    def send
      @headers.each do |key, values|
        @response.set_header(key, values.join("; "))
      end
    end
  end
end