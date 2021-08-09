class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :channel_id, :status, :start_at, :end_at,
             :created_at, :updated_at, :evaluate, :with_self, :memos, :reports, :statuses, :chats,
             :accepting_requests, :users, :conversation_requests, :available

  def self.each_json(models)
    models.map {|c| JSON.parse(ConversationSerializer.new(c).to_json) }
  end

  def users
    UserInConversationSerializer.each_json(object.users)
  end

  def chats
    object.chats.map do |c|
      ChatSerializer.new(c)
    end
  end

  def available
    user = Context.instance.current_user
    if user.present? && user.trial? && (user.conversations.queued.exists? || user.conversation_requests.available.exists?)
      false
    else
      true
    end
  end

  def evaluate
    evaluations = []
    evaluations << teacher_evaluation if object.teacher_rated?
    evaluations << student_evaluation if object.student_rated?
    evaluations
  end

  def memos
    [
      user_memo(object.teacher),
      user_memo(object.student),
    ].select(&:present?)
  end

  def reports
    [
      user_report(object.teacher),
      user_report(object.student),
    ].select(&:present?)
  end

  def statuses
    [
      object.teacher_online_status || 'Absent',
      object.student_online_status || 'Absent',
    ].select(&:present?)
  end

  def with_self
    if Context.instance.current_user.nil?
      false
    else
      [object.teacher_id, object.student_id].include? Context.instance.current_user.id
    end
  end

  def conversation_requests
    object.conversation_requests.map do |cr|
      ConversationRequestsInConversationSerializer.new(cr)
    end
  end

  def context_user_memo
    user_memo(Context.instance.current_user)
  end

  def context_user_report
    user_report(Context.instance.current_user)
  end

  def context_user_report_detailed
    user_report_detailed(Context.instance.current_user)
  end

  private

    def user_memo(user)
      if user.nil?
        nil
      elsif user.teacher?
        { timestamp: object.start_at, memo: object.teacher_memo || "" }
      else
        { timestamp: object.start_at, memo: object.student_memo || "" }
      end
    end

    def user_report(user)
      if user.nil?
        nil
      elsif user.teacher?
        { timestamp: object.start_at, report: object.teacher_report }
      else
        { timestamp: object.start_at, report: object.student_report }
      end
    end

    def user_report_detailed(user)
      if user.nil?
        nil
      elsif user.teacher?
        report_reasons = []
        report_reasons << 1 if object.teacher_report_solicitation?
        report_reasons << 2 if object.teacher_report_spam?
        report_reasons << 3 if object.teacher_report_sexual?
        report_reasons << 4 if object.teacher_report_criminal?
        report_reasons << 5 if object.teacher_report_other?

        {
          report_reasons: report_reasons,
          report_detail: object.teacher_report,
        }
      else
        report_reasons = []
        report_reasons << 1 if object.student_report_solicitation?
        report_reasons << 2 if object.student_report_spam?
        report_reasons << 3 if object.student_report_sexual?
        report_reasons << 4 if object.student_report_criminal?
        report_reasons << 5 if object.student_report_other?

        {
          report_reasons: report_reasons,
          report_detail: object.student_report,
        }
      end
    end

    def evaluation(type)
      quality = []
      prefix = type + "_"
      %w[video_unstable video_invisible environment_loud sound_unstable].each_with_index do |name, i|
        keyword = (prefix + name).to_sym
        quality << i + 1 if object[keyword]
      end
      quality
    end

    def teacher_evaluation
      {
        user_id: object.teacher_id,
        evaluate: {
          fun: object.teacher_evaluation_fun,
          ability: object.teacher_evaluation_ability,
          time: object.teacher_evaluation_time,
          quality: evaluation("teacher"),
        }
      }
    end

    def student_evaluation
      {
        user_id: object.student_id,
        evaluate: {
          fun: object.student_evaluation_fun,
          ability: object.student_evaluation_ability,
          time: object.student_evaluation_time,
          quality: evaluation("student"),
        }
      }
    end

    def teacher_memo
      {
        user_id: object.teacher_id,
        memo: object.teacher_memo,
      }
    end

    def student_memo
      {
        user_id: object.student_id,
        memo: object.student_memo,
      }
    end

    def teacher_report
      {
        user_id: object.teacher_id,
        report: user_report_detailed(object.teacher),
      }
    end

    def student_report
      {
        user_id: object.student_id,
        report: user_report_detailed(object.student),
      }
    end
end
