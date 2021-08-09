FactoryBot.define do
  factory :conversation do
    admin_user { nil }
    start_at   { Time.zone.now }
    end_at     { Time.zone.now + Conversation::DURATION }
    status     { Conversation::STATUSES.sample }
  end
end
