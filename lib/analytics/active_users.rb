module Analytics
  class ActiveUsers < EscalatorTerms
    def total
      @total ||= terms.map do |term|
                    user_ids = unique_user_ids(term)
                    count = User.where(id: user_ids).count
                    term.value = count
                    term
                  end
    end

    def teachers
      @teachers ||= terms.map do |term|
                      user_ids = unique_user_ids(term)
                      count = Teacher.where(id: user_ids).count
                      term.value = count
                      term
                    end
    end

    def students
      @students ||= terms.map do |term|
                      user_ids = unique_user_ids(term)
                      count = Student.where(id: user_ids).count
                      term.value = count
                      term
                    end
    end

    private

      def unique_user_ids(term)
        # Talked users
        conversation_ids = Conversation.finished.where("start_at >= ?", term.start_at).where("end_at < ?", term.end_at).pluck(:id)
        talked_user_ids = UsersConversation.where(conversation_id: conversation_ids, onlined: true).pluck(:user_id)

        # Will-talk users
        will_talk_user_ids = UsersConversation.where("created_at >= ?", term.start_at).where("created_at < ?", term.end_at).pluck(:user_id)

        (talked_user_ids + will_talk_user_ids).uniq
      end
  end
end
