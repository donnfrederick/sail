module Analytics
  class StatsFactory
    attr_reader :since, :by, :term, :duration

    def initialize(since: nil, by: nil, term: nil, duration: 1)
      @since = since
      @by = by
      @term = term
      @duration = duration
    end

    # @note To be overridden
    def offset(nth)
      nth.seconds
    end

    def termly
      terms = 0
      nth = 1
      loop do
        start_at = since + offset(terms)
        end_at = (since + offset(terms + duration)) - 1.second
        break if start_at > by

        yield(self, nth, start_at, end_at)

        nth += 1
        terms += duration
      end
    end

    private

      def timezone
        @timezone ||= SiteConfig.find_by_keyword("analytics.timezone", "Asia/Tokyo").tap do |value|
          Time.zone = value
        end
      end

      def service_created_at
        @service_created_at ||= Time.parse("2016-03-22 00:00:00+0900").in_time_zone(timezone).beginning_of_day
      end

      def current_time
        @current_time ||= Time.now.in_time_zone(timezone)
      end
  end
end
