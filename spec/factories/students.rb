FactoryBot.define do
  factory :student do
    country  = ISO3166::Country.codes.first
    timezone = ISO3166::Country.new(country).timezones.zone_identifiers.first

    sns = ["facebook", nil].sample

    provider               { sns }
    uid                    { sns.present? ? SecureRandom.hex : nil }

    auth_token             { nil }

    sequence(:username)    {|n| "student #{n}" }
    name_ja                { nil }
    name_en                {
      Faker::Config.locale = :en
      terms = Faker::Name.unique.name.split(" ")
      terms.count > 1 ? terms[0] + " " + terms[1] : terms[0]
    }
    sex                    { [User::SEX_MALE, User::SEX_FEMALE, User::SEX_APPLICABLE].sample }
    level                  { Student::LEVELS.sample }
    conversation_level     { Student::CONVERSATION_LEVELS.sample }
    country                { country }
    timezone               { timezone }
    sequence(:email)       {|n| "student+#{n}@example.com" }
    password               { "password" }
    password_confirmation  { "password" }
    birthday               { Faker::Date.birthday }
    activation_digest      { SecureRandom.hex }
    is_activated           { true }
    activated_at           { rand(1..365).days.ago }
    activation_sent_at     { rand(1..365).days.ago }
    password_reset_digest  { nil }
    password_reset_sent_at { nil }
    deleted_at             { nil }
    picture                { nil }
    organization_device    { nil }

    factory :student_with_picture do
      picture do
        Rack::Test::UploadedFile.new(Rails.root.join("spec/factories/files/10x10.png"))
      end
    end

    after(:create) do |student|
      package = IndividualStudentPackage.find_by_name("test_only_individual_student_free_package")
      issue_service = IssueCreateService.new(student)
      issue_service.create_free!(package)
    end
  end
end
