module Analytics
  class DailyStatsFactory < StatsFactory

    def initialize(since: nil, by: nil)
      since = (since || service_created_at).beginning_of_day
      by = (by || current_time).end_of_day

      super(since: since, by: by, term: "daily")
    end

    def latest_only!
      @since = (current_time - 1.day).beginning_of_day
      @by = @since.end_of_day
    end

    def days
      ((by - since) / 1.day).ceil
    end

    def offset(nth)
      nth.days
    end
  end
end
