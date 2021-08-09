class User
  def language
    languages = {
      spanish: %w[ES MX CR GT SV PA HN NI CU DM DO PR CO PE VE BO CL AR UY PY GN GW],
      vietnamese: %w[VN],
      indonesian: %w[ID],
      traditional_chinese: %w[TW],
      simple_chinese: %w[HK MY],
      thai: %w[TH],
      bralizian: %w[BR],
      english: %w[MM IN US UK AU],
    }
    found = nil
    languages.each_with_index do |d|
      lang, country_codes = d
      found = lang.to_s if country_codes.include? self.country
    end

    found
  end
end
