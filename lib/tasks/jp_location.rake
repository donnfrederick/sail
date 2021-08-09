namespace :jp_location do

  desc "都道府県、市区町村のマスターデータを更新する"
  task update: :environment do
    JpLocation.fetch
  end

end
