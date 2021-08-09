FactoryBot.define do
  factory :organization do
    industry      { Organization::INDUSTRIES.sample }
    country       { "jp" }
    name_ja       { Faker::Company.name }
    name_en       { Faker::Company.name }
    name_kana     { Faker::Company.name }
    local_address { Gimei.address }
    phone_number  { Faker::PhoneNumber.phone_number.delete(".") }
    deleted_at    { nil }
  end
end
