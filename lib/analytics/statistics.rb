module Analytics
  class Statistics
    attr_reader :stats_factory

    def initialize(stats_factory)
      @stats_factory = stats_factory
    end

    def update_all!
      stats_factory.termly do |_h, nth, start_at, end_at|
        update!(nth, start_at, end_at)
      end
    end

    def update!(nth, start_at, end_at)
      data = data_at(start_at, end_at)
      stat = Stat.where(name: name, nth: nth).first
      if stat.present?
        stat.update!(
          start_at: start_at,
          term: stats_factory.term,
          duration: stats_factory.duration,
          data: data,
          digest: digest,
          )
      else
        Stat.create!(
          name: name,
          nth: nth,
          start_at: start_at,
          term: stats_factory.term,
          duration: stats_factory.duration,
          data: data,
          digest: digest,
          )
      end
    end

    def clean_up!
      Stat.where(name: name).where.not(digest: digest).destroy_all
    end

    def name
      @name ||= self.class.name.tableize
    end

    def description
      I18n.t("#{name.gsub("/", ".")}.description", default: "")
    end

    def digest
      @digest ||= Stat.build_digest(columns.join("-"))
    end

    def columns
      # @note To be overridden
      []
    end

    def data_at(start_at, end_at)
      # @note To be overridden
      []
    end

    def record_nth(nth)
      record = Stat.find_by(name: name, nth: nth, digest: digest)
      if record.present?
        JSON.parse(record.data).map.
          with_index {|value, index| [columns[index], value]}.
          to_h
      end
    end
  end
end
