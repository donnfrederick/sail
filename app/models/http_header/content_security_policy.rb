module HTTPHeader
  class ContentSecurityPolicy
    def initialize(values = {})
      @values = values
    end

    def append(type, value)
      @values[type] = [] unless @values[type].present?
      @values[type] += value.split(" ")
    end

    def send(response)
      headers = ResponseHeader.new(response)
      @values.each do |key, values|
        value = key + "-src " + values.join(" ")
        headers.append("X-Content-Security-Policy", value)    # Firefox
        headers.append("X-WebKit-CSP", value)                 # Chrome, Safari
        headers.append("Content-Security-Policy", value)      # W3C
      end
      headers.send
    end
  end
end