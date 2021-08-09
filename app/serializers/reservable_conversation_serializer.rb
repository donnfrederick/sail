class ReservableConversationSerializer < ActiveModel::Serializer
  attributes :id, :channel_id, :status, :start_at, :end_at,
             :created_at, :updated_at, :evaluate, :with_self, :memos,
             :accepting_requests, :users, :available

  def self.each_json(models)
    models.map {|c| JSON.parse(ReservableConversationSerializer.new(c).to_json) }
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
    ConversationSerializer.new(object.conversation).evaluate
  end

  def memos
    ConversationSerializer.new(object.conversation).memos
  end

  def users
    ConversationSerializer.new(object.conversation).users
  end
end
