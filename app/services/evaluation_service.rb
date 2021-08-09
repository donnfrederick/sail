class EvaluationService < ApplicationService
  attr_reader :conversation, :evaluator_user

  def initialize(conversation, evaluator_user)
    @conversation = conversation
    @evaluator_user = evaluator_user
  end

  def evaluate_from_params(params)
    return false if not_permitted?

    values = {}
    values.merge!(compose_named_evaluations(%w[fun ability time], params))
    if params[:quality].present?
      values.merge!(compose_list_evaluations(%w[video_unstable video_invisible environment_loud sound_unstable], params[:quality]))
    end

    values[(prefix + "_rated").to_sym] = true

    conversation.update(values)
  end

  def errors
    conversation.errors
  end

  def not_permitted?
    keyword = (evaluator_user.type.downcase + "_online_status").to_sym
    ["Absent", nil].include?(conversation[keyword])
  end

  private

    def prefix
      @prefix ||= evaluator_user.type.downcase
    end

    def compose_named_evaluations(names, params)
      values = {}
      names.each do |suffix|
        short_keyword = suffix.to_sym
        long_keyword = (prefix + "_evaluation_" + suffix).to_sym
        values[long_keyword] = params[short_keyword] if params[short_keyword].present?
      end

      values
    end

    def compose_list_evaluations(names, list)
      values = {}
      names.each_with_index do |suffix, i|
        long_keyword = (prefix + "_" + suffix).to_sym
        values[long_keyword] = list.include?(i + 1)
      end

      values
    end
end
