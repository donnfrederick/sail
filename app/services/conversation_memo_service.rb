class ConversationMemoService < ApplicationService
  attr_reader :conversation, :author_user

  def initialize(conversation, author_user)
    @conversation = conversation
    @author_user = author_user
  end

  def memo_from_params(params)
    values = if author_user.teacher?
               { teacher_memo: (params[:memo] || "") }
             else
               { student_memo: (params[:memo] || "") }
             end
    conversation.update(values)
  end

  def errors
    conversation.errors
  end

  private

    def participant
      @participant ||= if author_user.teacher?
                         conversation.teacher
                       else
                         conversation.student
                       end
    end
end
