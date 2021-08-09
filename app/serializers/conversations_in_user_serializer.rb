class ConversationsInUserSerializer < ActiveModel::Serializer
  attributes :id, :channel_id, :status, :start_at, :end_at,
             :created_at, :updated_at, :evaluate, :with_self, :memos, :statuses,
             :accepting_requests

  def evaluate
    evaluations = []
    evaluations << teacher_evaluation if object.teacher_rated?
    evaluations << student_evaluation if object.student_rated?
    evaluations
  end

  def memos
    memos = []
    memos << teacher_memo unless object.teacher_memo.nil?
    memos << student_memo unless object.student_memo.nil?
    memos
  end

  def reports
    reports = []
    reports << teacher_report unless object.teacher_report.nil?
    reports << student_report unless object.student_report.nil?
    reports
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

  private

    def teacher_evaluation
      quality = []
      quality << 1 if object.teacher_video_unstable?
      quality << 2 if object.teacher_sound_unstable?
      quality << 3 if object.teacher_video_invisible?
      quality << 4 if object.teacher_environment_loud?

      {
        user_id: object.teacher_id,
        evaluate: {
          fun: object.teacher_evaluation_fun,
          ability: object.teacher_evaluation_ability,
          time: object.teacher_evaluation_time,
          quality: quality,
        }
      }
    end

    def student_evaluation
      quality = []
      quality << 1 if object.student_video_unstable?
      quality << 2 if object.student_sound_unstable?
      quality << 3 if object.student_video_invisible?
      quality << 4 if object.student_environment_loud?

      {
        user_id: object.student_id,
        evaluate: {
          fun: object.student_evaluation_fun,
          ability: object.student_evaluation_ability,
          time: object.student_evaluation_time,
          quality: quality,
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

      report_reasons = []
      report_reasons << 1 if object.teacher_report_solicitation?
      report_reasons << 2 if object.teacher_report_spam?
      report_reasons << 3 if object.teacher_report_sexual?
      report_reasons << 4 if object.teacher_report_criminal?
      report_reasons << 5 if object.teacher_report_other?

      {
        user_id: object.teacher_id,
        report: {
          report_reasons: report_reasons,
          report_detail: object.student_report,
        }
      }
    end

    def student_report

      report_reasons = []
      report_reasons << 1 if object.student_report_solicitation?
      report_reasons << 2 if object.student_report_spam?
      report_reasons << 3 if object.student_report_sexual?
      report_reasons << 4 if object.student_report_criminal?
      report_reasons << 5 if object.student_report_other?

      {
        user_id: object.student_id,
        report: {
          report_reasons: report_reasons,
          report_detail: object.student_report,
        }
      }
    end
end
