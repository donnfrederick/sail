class QualityEvaluation < ApplicationRecord
  scope :by_evaluation, ->(evaluation) {
    where(evaluation_id: evaluation.id)
  }

  scope :by_quality_id, ->(quality_id) {
    where(quality_id: quality_id)
  }
end
