FactoryBot.define do
  factory :evaluation do
    association :quality_evaluations

    fun { Evaluation::FUNS.sample }
    ability { Evaluation::ABILITIES.sample }
    time { Evaluation::TIMES.sample }
  end
end
