module Analytics
  class Term
    attr_reader :name, :start_at, :end_at
    attr_accessor :value

    def initialize(name, start_at, end_at, value = nil)
      @name = name
      @start_at = start_at
      @end_at = end_at
      @value = value
    end
  end
end
