class ReservableConversationSerializerCal < ActiveModel::Serializer
  attributes :id, :channel_id, :status, :start_at, :end_at,
             :accepting_requests, :users, :available

  def self.each_json(models)
    # Rails.logger.info "出力モデル2: #{models}"
    models.map {|c| JSON.parse(ReservableConversationSerializerCal.new(c).to_json) }
    # Rails.logger.info "シリアライズ終了"
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
    ConversationSerializerCal.new(object.conversation).evaluate
  end

  def memos
    ConversationSerializerCal.new(object.conversation).memos
  end

  def users
    ConversationSerializerCal.new(object.conversation).users
  end
end
