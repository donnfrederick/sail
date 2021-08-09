class ConversationReportService < ApplicationService
  attr_reader :conversation, :reporter_user

  def initialize(conversation, reporter_user)
    @conversation = conversation
    @reporter_user = reporter_user
  end

  def report_from_params(params, request_block = false)
    values = build_values_from_params(params)
    result = conversation.update(values)
    if result && request_block && !reporter_user.blocks?(participant)
      reporter_user.block(participant)
    end

    result
  end

  def errors
    conversation.errors
  end

  private

    def participant
      @participant ||= if reporter_user.teacher?
                         conversation.student
                       else
                         conversation.teacher
                       end
    end

    def build_values_from_params(params)
      prefix = reporter_user.type.downcase
      values = {}

      long_keyword = (prefix + "_report").to_sym
      values[long_keyword] = params[:report_detail] || ""

      %w[spam sexual criminal other].each_with_index do |suffix, i|
        long_keyword = (prefix + "_report_" + suffix).to_sym
        values[long_keyword] = params[:report_reasons].include?(i + 1)
      end

      values
    end
end
