require "open-uri"
require "zip"
require "csv"

class JpLocation < ActiveYaml::Base
  set_root_path "#{Rails.root}/db/datasources/"

  PREFECTURES = YAML.load_file("#{Rails.root}/db/datasources/jp_prefectures.yml").values
  PREFECTURE_MAX_LENGTH = 4
  SOURCE_URL  = "http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip"

  # 住所 から 都道府県名、市区町村名 を返す
  # JpLocation.find_by_address("秋田県由利本荘市石脇字1-1-1")
  # #=> #<JpLocation:0x00007fbe351500b8 @attributes={:prefecture_ja=>"秋田県", :prefecture_en=>"Akita", :city_ja=>"由利本荘市", :city_en=>"Yurihonjo-Shi", :id=>295}>
  def self.find_by_address(address)
    return nil if address.nil?

    # 都道府県
    prefecture_ja = address.first(PREFECTURE_MAX_LENGTH).scan(/#{PREFECTURES.join('|')}/).first

    # 市区町村
    cities = find_all_by_prefecture_ja(prefecture_ja).map{|x| x[:city_ja] }
    city_ja = address.scan(/#{prefecture_ja}.*?(#{cities.join('|')})/).first

    return nil if prefecture_ja.nil? || city_ja.nil?

    find_by(prefecture_ja: prefecture_ja, city_ja: city_ja)
  end

  # 都道府県名、市区町村名 のマスターデータを更新する
  def self.fetch
    results = []

    Zip::File.open_buffer(open(SOURCE_URL)) do |zip|
      zip.each do |entry|
        next unless entry.name.match(/\.csv$/i)

        content = entry.get_input_stream
        data    = content.read

        _before_row = nil
        CSV.new(data.encode("UTF-8", "Shift_JIS")).each do |row|
          prefecture_ja = row[1]
          city_ja       = city_name_ja(row[2])
          prefecture_en = prefecture_name_en(row[4])
          city_en       = city_name_en(row[5])

          next if _before_row == "#{prefecture_ja}#{city_ja}"

          results << {
            prefecture_ja: prefecture_ja,
            prefecture_en: prefecture_en,
            city_ja:       city_ja,
            city_en:       city_en,
          }

          _before_row = "#{prefecture_ja}#{city_ja}"
        end
      end
    end

    YAML.dump(results, File.open(JpLocation.full_path, 'w'))
  end

  # 都道府県名を抽出する
  # ex) "AOMORI KEN" #=> "AOMORI"
  def self.prefecture_name_en(prefecture)
    prefecture.split(/\s/).first.capitalize
  end

  # 市町村名を抽出する
  # ex) "XX市　ZZ区" #=> "XX市"
  #     "XX島　ZZ町" #=> "XX島"
  #     "XX郡　ZZ町" #=> "ZZ町"
  def self.city_name_ja(city)
    case city
    when /\A.+郡　/ then city.split('　').last
    when /\A.+島　/ then city.split('　').first
    when /　.+区\Z/ then city.split('　').first
    else city
    end
  end

  # 市町村名を抽出する
  # ex) "XX SHI ZZ KU" #=> "Xx-shi"
  #     "XXJIMA ZZ CHO" #=> "Xxjima"
  #     "XX GUN ZZ CHO" #=> "Zz-cho"
  def self.city_name_en(city)
    name = if city.match(/\sGUN\s/)
             name = city.match(/\A.+\sGUN\s(.+)\Z/).captures.first
           elsif city.match(/\w+JIMA\s/) && !city.match(/JIMA\s(SHI|KU|MURA|CHO|MACHI)/)
             name = city.match(/\A(.+JIMA)\s.+\Z/).captures.first
           elsif city.match(/\sSHI\s.*\sKU\Z/)
             name = city.match(/\A(.+\sSHI)\s.+\Z/).captures.first
           else
             city
           end

    name.split(/\s/).map(&:capitalize).join("-")
  end
end
