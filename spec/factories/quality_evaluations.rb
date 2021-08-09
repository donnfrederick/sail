FactoryBot.define do
  factory :quality_evaluation do
    quality_id { Evaluation::QUALITIES.sample }
  end
end
