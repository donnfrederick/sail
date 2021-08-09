FactoryBot.define do
  factory :organization_device do
    association :organization_staff

    model_number               { SecureRandom.hex(10) }
    property_management_number { SecureRandom.hex(10) }
    checkout_at                { rand(1..365).days.since }
    return_at                  { rand(1..365).days.since }
    deleted_at                 { nil }
  end
end
