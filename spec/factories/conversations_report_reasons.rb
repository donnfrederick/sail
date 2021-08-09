FactoryBot.define do
  factory :conversations_report_reason do
    association :conversations_report

    reason_id { ConversationsReportReason::IDS.sample }
  end
end
