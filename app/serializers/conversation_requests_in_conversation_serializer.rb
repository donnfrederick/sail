class ConversationRequestsInConversationSerializer < ActiveModel::Serializer
  attributes :id, :user, :start_at, :end_at

  def user
    UserInConversationSerializer.new(object.from_user)
  end
end
