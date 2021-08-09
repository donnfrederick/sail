FactoryBot.define do
  factory :conversations_memo do
    association :users_conversation

    memo { "メモをここに書きます。メモをここに書きます。メモをここに書きます。メモをここに書きます。" }
  end
end
