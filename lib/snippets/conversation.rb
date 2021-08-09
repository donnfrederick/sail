module Snippets
  class Conversation
    def self.fix_past_waiting
      ::Conversation.only_past.by_teacher_id(nil).waiting.find_each do |c|
        service = ConversationFinishService.new(c)
        service.close!
      end
      ::Conversation.only_past.by_student_id(nil).waiting.find_each do |c|
        service = ConversationFinishService.new(c)
        service.close!
      end
    end
  end
end
