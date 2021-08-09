class Evaluation < ApplicationRecord
  belongs_to :users_conversation
  has_many :quality_evaluations

  FUNS = [
    VERY_FUNNY = 1,    # とても面白かった！
    LOVELY = 2,        # 気に入った
    AMAZING = 3,       # 驚いた・知らなかった
    FINE = 4,          # よかった
    UNCOMFORTABLE = 5, # 不満がある
  ].freeze

  ABILITIES = [
    MOST_FLUENT = 1,  # スムーズに会話ができた
    FLUENT = 2,       # たまに単語が出ないでつまずいた
    CAN_TALK = 3,     # 続くけどしどろもどろ
    NOT_FLUENT = 4,   # あまり続かない
    HARD_TO_TALK = 5, # まったく会話にならない
  ].freeze

  TIMES = [
    ONTIME = 1,       # 5時間通りに来た
    LITTLE_LATE = 2,  # 少し遅刻した
    LATE = 3,         # 5分以上遅刻した
    ABSENT = 4,       # 来なかった
  ].freeze

  QUALITIES = [
    VIDEO_UNSTABLE = 1,   # 映像がたまに切れていた
    VIDEO_INVISIBLE = 2,  # まったく映らなかった
    ENVIRONMENT_LOUD = 3, # 周囲の雑音が多かった
    SOUND_UNSTABLE = 4,   # 音声がブツブツ切れていた
  ].freeze

  def update_qualities(quality_ids)
    quality_ids.uniq!
    current_quality_ids = quality_evaluations.map(&:quality_id)
    # Add quality ids
    (quality_ids - current_quality_ids).each do |quality_id|
      quality = QualityEvaluation.new(evaluation_id: self.id, quality_id: quality_id)
      quality.save!
    end
    # Remove quality ids
    QualityEvaluation.by_evaluation(self).by_quality_id(current_quality_ids - quality_ids).destroy_all
  end

end
