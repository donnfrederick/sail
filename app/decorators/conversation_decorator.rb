module ConversationDecorator
  def teacher_name
    self.teacher.try(&:name)
  end

  def teacher_punctuality
    punctuality(self.teacher_online_status)
  end

  def teacher_reliability
    self.teacher.try(&:reliability_marker)
  end

  def student_name
    self.student.try(&:name)
  end

  def student_punctuality
    punctuality(self.student_online_status)
  end

  def student_reliability
    self.student.try(&:reliability_marker)
  end

  def punctuality(online_status)
    return if self.start_at > Time.now || self.status_unmatched?
    return (online_status || "Absent") if self.end_at < Time.now

    if online_status == "Absent"
      "Not meet"
    elsif online_status
      online_status
    else
      "Not come"
    end
  end

  def cancelled_at(cc = nil, locale: nil)
    return unless self.status_cancelled?

    cc ||= self.cancelled_conversation
    return if cc.nil?

    locale = I18n.locale if locale.nil?
    time, reason = if cc.present?
                     [
                       cc.created_at.to_s,
                       I18n.t("conversation.cancelled_at.reason.#{cc.reason || "other"}", locale: locale),
                     ]
                   else
                     [
                       self.updated_at.to_s,
                       "(no data)",
                     ]
                   end

    I18n.t("conversation.cancelled_at.title", locale: locale, time: time, reason: reason)
  end

  def request_count
    self.requests.count
  end

  def video_chunk_count
    self.video_chunks.count
  end
end
