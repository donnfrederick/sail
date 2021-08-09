class Grade < ApplicationRecord
  TYPE_MEMBER   = 'GradeMember'
  TYPE_SILVER   = 'GradeSilver'
  TYPE_GOLD     = 'GradeGold'
  TYPE_PLATINUM = 'GradePlatinum'

  has_many :users_grades

  scope :available_for, ->(**opts) {
    conditions  = opts.map do |opt|
      if opt[0] === :current_step
        "step <= #{opt[1] + 1}"
      elsif opt[0] === :conversation_count
        "min_conversation_count <= #{opt[1]}"
      elsif opt[0].to_s.include? "_percentage"
        "max_#{opt[0].to_s} >= #{[opt[1], 100].min}"
      else
        "max_#{opt[0].to_s} >= #{opt[1]}"
      end
    end

    where(conditions.join(" AND "))
  }
  scope :by_step, -> (step) { where(step: step) }

  scope :forward, -> { order(step: :asc) }
  scope :backward, -> { order(step: :desc) }

  validates :min_conversation_count,           numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :max_absence_percentage,           numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :max_lateness_percentage,          numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :max_negative_feedback_percentage, numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :max_discommunication_percentage,  numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :max_no_video_percentage,          numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 100}
  validates :max_noisy_place_percentage,       numericality: {greater_than_or_equal_to: 0, less_than_or_equal_to: 100}

  def name
    self.type[Grade.name.length, self.type.length - Grade.name.length]
  end
end
