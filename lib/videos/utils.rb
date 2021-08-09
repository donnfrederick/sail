module Videos
  class Utils
    def self.random_filename(dirname, ext = "")
      loop do
        basename = SecureRandom.uuid
        file = dirname + "/" + basename + ext
        return file unless ::File.exist?(file)
      end
    end
  end
end