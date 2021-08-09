class Conversation
  # TODO サービス層を使っているのでサービス層かコントローラー層に移行すべき
  def ambush_conversation(teacher)
    acs = ::AmbushConversation.during(self.start_at, self.end_at).visible
    acs = acs.
      reject {|x| x.user.blocked_by?(user) }.
      reject {|x| x.user.excludes?(user) }.
      select {|x| user.enough_skillful_for?(x.user) }
    best_ac = acs.max {|a, b| a.user.score(teacher) <=> b.user.score(teacher) }

    return if best_ac.blank?

    service = ConversationReserveService.new
    if service.reserve_by_reservable_conversation(best_ac.user, best_ac)
      best_ac.destroy
    else
      false
    end
  end
end
