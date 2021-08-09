# == Schema Information
#
# Table name: quality_evaluations
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  evaluation_id :bigint
#  quality_id    :integer          default(0)
#
# Indexes
#
#  index_quality_evaluations_on_evaluation_id                 (evaluation_id)
#  index_quality_evaluations_on_evaluation_id_and_quality_id  (evaluation_id,quality_id) UNIQUE
#
class QualityEvaluation < ApplicationRecord
  scope :by_evaluation, ->(evaluation) {
    where(evaluation_id: evaluation.id)
  }

  scope :by_quality_id, ->(quality_id) {
    where(quality_id: quality_id)
  }
end
