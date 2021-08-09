FactoryBot.define do
  factory :conversations_report do
    association :conversation
    association :conversations_report_reasons
  end
end
