module Analytics
  class MatchingTimes < MonthlyTerms
    def in_1_hour
      data.map do |term|
        term2 = term.clone
        term2.value = term.value.select {|wt| wt < 3600 }.count
        term2
      end
    end

    def in_3_hours
      data.map do |term|
        term2 = term.clone
        term2.value = term.value.select {|wt| wt >= 3600 && wt < 21600 }.count
        term2
      end
    end

    def in_3_days
      data.map do |term|
        term2 = term.clone
        term2.value = term.value.select {|wt| wt >= 21600 && wt < 259200 }.count
        term2
      end
    end

    def in_a_week
      data.map do |term|
        term2 = term.clone
        term2.value = term.value.select {|wt| wt >= 259200 && wt < 604800 }.count
        term2
      end
    end

    def more_than_a_week
      data.map do |term|
        term2 = term.clone
        term2.value = term.value.select {|wt| wt >= 604800 }.count
        term2
      end
    end

    def data
      @data ||= terms.map do |term|
        wait_times = MatchingTimes.times_since(term)
        term.value = wait_times
        term
      end
    end

    # Seconds until the conversation has matched since it has opened once
    # The result won't matter which conversation belongs
    def self.times_since(term)
      Conversation.start_at_by(term.start_at).end_at_by(term.end_at).matched.map do |conversation|
        conversation.matched_at - conversation.start_at
      end
    end
  end
end
