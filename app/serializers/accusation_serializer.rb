class AccusationSerializer < ActiveModel::Serializer
  attributes :conversation, :from_user, :to_user, :accusation_reason

  def conversation
    ConversationSerializer.new(object.conversation)
  end

  def from_user
    UserSerializer.new(object.from_user)
  end

  def to_user
    UserSerializer.new(object.to_user)
  end
end
