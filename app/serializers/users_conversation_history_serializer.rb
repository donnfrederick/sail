# TODO 名前を変えたい = クラス名から機能がわからない
class UsersConversationHistorySerializer
  attr_reader :target_user

  def initialize(target_user)
    @target_user = target_user
  end

  def unrated_conversations
    current_user = Context.instance.current_user

    if current_user.nil?
      []
    elsif current_user.teacher?
      Conversation.where(id: finished_conversation_ids).only_unrated_by_teacher.only_attended_by_teacher.recently.map do |conversation|
        { timestamp: conversation.start_at, id: conversation.id }
      end
    else
      Conversation.where(id: finished_conversation_ids).only_unrated_by_student.only_attended_by_student.recently.map do |conversation|
        { timestamp: conversation.start_at, id: conversation.id }
      end
    end
  end

  def memos
    current_user = Context.instance.current_user

    if current_user.nil?
      []
    elsif current_user.teacher?
      Conversation.where(id: finished_conversation_ids).rated_or_absent_by_teacher.recently.map do |conversation|
        ConversationSerializer.new(conversation).context_user_memo
      end
    else
      Conversation.where(id: finished_conversation_ids).rated_or_absent_by_student.recently.map do |conversation|
        ConversationSerializer.new(conversation).context_user_memo
      end
    end
  end

  def reports
    current_user = Context.instance.current_user

    if current_user.nil?
      []
    elsif current_user.teacher?
      Conversation.where(id: finished_conversation_ids).has_teacher_report.recently.map do |conversation|
        ConversationSerializer.new(conversation).context_user_report
      end
    else
      Conversation.where(id: finished_conversation_ids).has_student_report.recently.map do |conversation|
        ConversationSerializer.new(conversation).context_user_report
      end
    end
  end

  def to_json2
    {
      unrated_conversations: unrated_conversations,
      memos: memos,
      reports: reports,
    }
  end

  private

    def finished_conversation_ids
      current_user = Context.instance.current_user
      @finished_conversation_ids ||= if current_user.nil?
                                       nil
                                     elsif current_user.teacher?
                                       current_user.conversations.finished.by_student_id(target_user.id).pluck(:id)
                                     else
                                       current_user.conversations.finished.by_teacher_id(target_user.id).pluck(:id)
                                     end
    end
end
