FactoryBot.define do
  factory :organization_section do
    association :organization

    names = []

    name_ja    {|n|
      names << Gimei.town unless names.count == n
      if organization.university?
        "#{Faker::Name.name}'s class"
      else
        names.last.kanji
      end
    }
    name_en    {|n|
      names << Gimei.town unless names.count == n
      if organization.university?
        "#{Faker::Name.name}'s class"
      else
        names.last.kanji
      end
    }
    deleted_at { nil }
  end
end
