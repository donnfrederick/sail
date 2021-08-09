class StringFileIO < StringIO
  attr_accessor :blob, :content_type, :original_filename

  def initialize(blob, content_type, original_filename)
    super(blob)

    @content_type      = content_type
    @original_filename = original_filename
  end

  def self.from_base64(base64)
    if base64.match?(/^data/)
      mime_type, _encode, data = base64.match(/data:(.*?);(.*?),(.*)$/).captures
    else
      _encode   = nil
      data      = base64
      mime_type = case data
                  when %r{^/9j/4} then "image/jpeg"
                  when /^iVBO/    then "image/png"
                  when /^R0lGOD/  then "image/gif"
                  end
    end

    extension = mime_type.to_s.split("/").last

    self.new(
      Base64.decode64(data),
      mime_type,
      ["original", extension].join("."),
    )
  end
end
