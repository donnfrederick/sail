FactoryBot.define do
  factory :conversation_request do
    association :from_user, factory: :student
  end
end
