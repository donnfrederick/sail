FactoryBot.define do
  factory :users_purpose do
    association :user
    association :purpose
  end
end
