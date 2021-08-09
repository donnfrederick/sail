FactoryBot.define do
  factory :block do
    association :from_user
    association :to_user
  end
end
