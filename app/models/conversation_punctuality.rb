class ConversationPunctuality
  attr_reader :conversation

  def initialize(conversation)
    @conversation = conversation
  end

  def ontime?
    conversation.start_at + 2.minutes > Time.now
  end

  def late?
    conversation.start_at + 10.minutes > Time.now
  end

  def absent?
    !ontime? && !late?
  end

  def status
    if ontime?
      "Ontime"
    elsif late?
      "Late"
    else
      "Absent"
    end
  end
end
