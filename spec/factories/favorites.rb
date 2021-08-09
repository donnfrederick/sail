FactoryBot.define do
  factory :favorite do
    association :from_user
    association :to_user
  end
end
