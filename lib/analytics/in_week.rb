module Analytics
  class InWeek < Statistics
    def columns
      %w[Saturday Sunday Monday Tuesday Wednesday Thursday Friday Total]
    end

    def data_at(initially_start_at, finally_end_at)
      list = columns.clone
      list.map.with_index do |name, offset|
        type = name.underscore.to_sym
        start_at, end_at = if type === :total
                             [
                               initially_start_at,
                               finally_end_at
                             ]
                           else
                             [
                               initially_start_at + offset.days,
                               initially_start_at + (offset + 1).days
                             ]
                           end
        each_data_at(type, start_at, end_at)
      end
    end

    def each_data_at(type, start_at, end_at)
      0
    end
  end
end
