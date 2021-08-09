class Notification
  def conversation_partner
    return if conversation.nil?

    if user.teacher?
      conversation.student
    elsif user.student?
      conversation.teacher
    end
  end

  def conversation_partner_experiences
    return 0 if conversation_partner.nil?

    conversation_partner.conversations.finished.count
  end

  def conversation_partner_name
    return if conversation.nil?

    if user.teacher?
      conversation.student.try(:name_en)
    elsif user.student?
      conversation.teacher.name_en
    end
  end

  def experiences_with_conversation_partner
    return 0 if conversation.nil?

    if user.teacher?
      user.conversations.by_student_id(conversation.student.id).finished.count
    elsif user.student?
      user.conversations.by_teacher_id(conversation.teacher.id).finished.count
    else
      0
    end
  end

  def conversation_partner_evaluation_most_fun

  end

  def conversation_partner_evaluation_fun

  end

  def conversation_partner_evaluation_less_fun

  end

  def conversation_partner_evaluation_not_fun

  end
end
