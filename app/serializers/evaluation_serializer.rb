class EvaluationSerializer < ActiveModel::Serializer
  attributes :fun, :ability, :time, :quality

  def quality
    object.quality_evaluations.map {|qe| qe.quality_id }
  end
end
