FactoryBot.define do
  factory :issue do
    data_id       { nil }
    type          { [Issue::TYPE_FREE, Issue::TYPE_STRIPE].sample }
    succeeded     { true }
    conversations { rand(-1..100) }
    expired_at    { [nil, Time.now].sample }
  end
end
