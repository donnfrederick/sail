module Analytics
  class WeeklyStatsFactory < StatsFactory

    def initialize(since: nil, by: nil)
      since = (since || service_created_at).beginning_of_week(start_of_week)
      by = (by || current_time).end_of_week(start_of_week)

      super(since: since, by: by, term: "weekly")
    end

    def latest_only!
      @since = (current_time - 1.day).beginning_of_week(start_of_week)
      @by = @since.end_of_week(start_of_week)
    end

    def weeks
      ((by - since) / 1.day).ceil
    end

    def offset(nth)
      nth.weeks
    end

    private

      def start_of_week
        @start_of_week ||= SiteConfig.find_by_keyword("analytics.start_of_week", "saturday").to_sym
      end
  end
end
