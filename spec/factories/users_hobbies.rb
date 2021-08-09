FactoryBot.define do
  factory :users_hobby do
    association :user
    association :hobby
  end
end
