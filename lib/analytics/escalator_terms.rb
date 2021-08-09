module Analytics
  class EscalatorTerms
    attr_reader :time_by

    def initialize(time_by = nil)
      @time_by = (time_by || Time.now).utc
    end

    def terms
      first_day = Time.parse("1970-01-01 00:00:00Z")

      [
        Term.new("1 week",   @time_by.weeks_ago(1),  @time_by),
        Term.new("3 weeks",  @time_by.weeks_ago(3),  @time_by),
        Term.new("1 month",  @time_by.prev_month,    @time_by),
        Term.new("3 months", @time_by.prev_month(3), @time_by),
        Term.new("6 months", @time_by.prev_month(6), @time_by),
        Term.new("1 year",   @time_by.prev_year(1),  @time_by),
        Term.new("total",    first_day,              @time_by),
      ]
    end
  end
end
