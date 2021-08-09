class ConversationRequestSerializer < ActiveModel::Serializer
  attributes :id, :conversation, :user, :start_at, :end_at

  def conversation
    ConversationSerializer.new(object.conversation)
  end

  def user
    UserInConversationSerializer.new(object.from_user)
  end
end
