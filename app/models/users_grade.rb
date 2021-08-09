class UsersGrade < ApplicationRecord
  belongs_to :user
  belongs_to :grade

  delegate :conversation_count, :feedback_count, :absence_count,
           :lateness_count, :negative_feedback_count, :discommunication_count,
           :no_video_count, :noisy_place_count,
           to: :factory, prefix: true

  validates :conversation_count,      numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :feedback_count,          numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :absence_count,           numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :lateness_count,          numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :negative_feedback_count, numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :discommunication_count,  numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :no_video_count,          numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :noisy_place_count,       numericality: {only_integer: true, greater_than_or_equal_to: 0}

  before_validation :set_grade

  def factory
    @factory ||= UsersGradeAggregator.new user
  end

  def aggregate
    UsersGrade.count_columns_for_factory.each {|n| self.send("#{n[0]}=", self.send(n[1])) }
    self.aggregated_at = Time.now
  end

  def current_step
    self.grade.try(:step) || 0
  end

  def absence_percentage
    percentage(self.absence_count, self.conversation_count)
  end

  def lateness_percentage
    percentage(self.lateness_count, self.conversation_count)
  end

  def negative_feedback_percentage
    percentage(self.negative_feedback_count, self.feedback_count)
  end

  def discommunication_percentage
    percentage(self.discommunication_count, self.feedback_count)
  end

  def no_video_percentage
    percentage(self.no_video_count, self.feedback_count)
  end

  def noisy_place_percentage
    percentage(self.noisy_place_count, self.feedback_count)
  end

  def next_grade
    Grade.by_step(current_step + 1).first
  end

  def prev_grade
    Grade.by_step(current_step - 1).first
  end

  private

    def set_grade
      conditions = {
        current_step: current_step,
        conversation_count: self.conversation_count,
      }
      UsersGrade.count_columns_for_percentage.each {|n| conditions[n[1].to_sym] = self.send(n[1]) }
      self.grade = Grade.available_for(conditions).backward.first
    end

    def percentage(fraction, denominator)
      if denominator > 0
        (fraction / denominator.to_f * 100).to_i
      else
        0
      end
    end

    def self.count_columns_for_factory
      column_names.
        select {|n| n.include? "_count" }.
        map {|n| [n, "factory_#{n}"]}.
        to_h
    end

    def self.count_columns_for_percentage
      column_names.
        select {|n| n.include?("_count") && %w[conversation_count feedback_count].exclude?(n) }.
        map {|n| [n, n[0, n.length - 6] + "_percentage"]}.
        to_h
    end
end
