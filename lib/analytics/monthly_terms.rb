module Analytics
  class MonthlyTerms
    attr_reader :time_by

    def initialize(time_by = nil)
      @time_by = (time_by || Time.now).utc
    end

    def terms
      objs = []
      6.downto 0 do |i|
        if i > 0
          start_at = @time_by.prev_month(i)
          end_at = start_at.next_month
          objs << Term.new(start_at.localtime.strftime("%Y %b"), start_at, end_at)
        else
          first_day = Time.parse("1970-01-01 00:00:00Z")
          objs << Term.new("total", first_day, @time_by)
        end
      end
      objs
    end
  end
end
