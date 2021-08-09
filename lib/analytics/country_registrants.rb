module Analytics
  class CountryRegistrants < Statistics
    def columns
      Array.new(18, 0).tap do |cols|
        cols.each_index do |i|
          place = i/2 + 1
          suffix = i%2 == 0 ? "country" : "count"
          cols[i] = "#{place.ordinalize} #{suffix}"
        end
      end
    end

    def data_at(start_at, end_at)
      list = columns.clone
      ranks = ranking(start_at, end_at)
      list.map.with_index do |_name, i|
        j = i/2
        rank = ranks[j]
        is_country = i%2 == 0
        if rank.nil?
          ""
        elsif is_country
          ISO3166::Country[rank[:country]].try(:name) || "(#{rank[:country]})"
        else
          rank[:count]
        end
      end
    end

    private

      def ranking(start_at, end_at)
        country_counts = Student.where("created_at >= ?", start_at).where("created_at < ?", end_at).group(:country).count
        country_counts = country_counts.sort_by {|data| data[1] }.reverse

        Array.new(10, nil).tap do |ranks|
          country_counts.each_with_index do |data, i|
            i = 9 if i > 8
            if ranks[i].nil?
              ranks[i] = {country: data[0], count: data[1]}
            else
              ranks[i][:count] += data[1]
            end
          end
        end
      end
  end
end
