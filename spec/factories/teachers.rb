FactoryBot.define do
  factory :teacher do
    names = []

    provider               { nil }
    uid                    { nil }

    auth_token             { nil }

    sequence(:username)    {|n| "teacher #{n}" }
    name_ja                {|n|
      names << Gimei.name unless names.count == n
      names.last.hiragana
    }
    name_en                {|n|
      names << Gimei.name unless names.count == n
      names.last.romaji
    }
    sex                    {|n|
      names << Gimei.name unless names.count == n
      names.last.male? ? User::SEX_MALE : User::SEX_FEMALE
    }
    level                  { nil }
    country                { "JP" }
    timezone               { "Asia/Tokyo" }
    sequence(:email)       {|n| "teacher+#{n}@example.com" }
    password               { "password" }
    password_confirmation  { "password" }
    birthday               { Faker::Date.birthday }
    activation_digest      { SecureRandom.hex }
    is_activated           { true }
    activated_at           { rand(1..365).days.ago }
    activation_sent_at     { rand(1..365).days.ago }
    password_reset_digest  { nil }
    password_reset_sent_at { nil }
    desired_condition      { User::DESIRED_CONDITIONS.sample }
    deleted_at             { nil }
    picture                { nil }

    association :organization_device

    factory :teacher_with_picture do
      picture do
        Rack::Test::UploadedFile.new(Rails.root.join("spec/factories/files/10x10.png"))
      end
    end

    after(:create) do |teacher|
      package = IndividualTeacherPackage.find_by_name("test_only_individual_teacher_free_package")
      issue_service = IssueCreateService.new(teacher)
      issue_service.create_free!(package)
    end
  end
end
