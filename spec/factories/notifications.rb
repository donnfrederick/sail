FactoryBot.define do
  factory :notification do

    association :conversation, :skip_validate

    transient do
      section { nil }
    end

    user_id                   { nil }
    scope                     {
      if section.present?
        "section-" + section.to_s
      else
        Notification::SCOPES.sample
      end
    }
    notification_type         { Notification::HELTE }

    sequence(:title_ja)           {|n| "ダミータイトル #{n}" * 10 }
    sequence(:title_en)           {|n| "Dummy Title #{n}" * 10 }
    sequence(:body_ja)            {|n| "ダミー本文 #{n}\n" * 20 }
    sequence(:body_en)            {|n| "Dummy Text #{n}\n" * 20 }
    sequence(:notificated_at)     {|n| (n * 10).minutes.ago }
  end
end
