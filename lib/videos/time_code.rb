module Videos
  class TimeCode
    attr_reader :time

    def self.from_seconds(number)
      time = Time.now.beginning_of_day + number.seconds
      new time
    end

    def initialize(time)
      @time = time
    end

    def to_s
      time.strftime("%H:%M:%S")
    end
  end
end