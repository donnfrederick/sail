module Analytics
  class MonthlyStatsFactory < StatsFactory

    def initialize(since: nil, by: nil)
      since = (since || service_created_at).beginning_of_month
      by = (by || current_time).end_of_month

      super(since: since, by: by, term: "monthly")
    end

    def latest_only!
      @since = (current_time - 1.day).beginning_of_month
      @by = @since.end_of_month
    end

    def months
      ((by - since) / 1.day).ceil
    end

    def offset(nth)
      nth.months
    end
  end
end
