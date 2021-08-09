FactoryBot.define do
  factory :organization_staff do
    association :organization_section

    official_position      { Faker::Company.profession }
    auth_token             { nil }
    sequence(:email)       {|n| "staff+#{n}@example.com" }
    password               { "password" }
    password_confirmation  { "password" }
    phone_number           { Faker::PhoneNumber.phone_number.delete(".") }
    password_reset_digest  { nil }
    password_reset_sent_at { nil }
    deleted_at             { nil }
  end
end
