class CancelledConversationSerializer < ActiveModel::Serializer
  attributes :id, :channel_id, :status, :start_at, :end_at,
             :created_at, :updated_at, :evaluate, :with_self, :memos, :statuses,
             :accepting_requests, :users

  def status
    Conversation::STATUS_CANCELED
  end

  def channel_id
    ""
  end

  def evaluate
    nil
  end

  def memos
    []
  end

  def statuses
    [].select(&:present?)
  end

  def with_self
    current_user = Context.instance.current_user

    if current_user.nil?
      false
    elsif current_user.teacher?
      object.teacher_id == current_user.id
    else
      object.student_id == current_user.id
    end
  end

  def accepting_requests
    false
  end

  def users
    User.where(id: [object.teacher_id, object.student_id]).where.not(id: nil).all.map do |user|
      JSON.parse(UserInConversationSerializer.new(user).to_json)
    end
  end
end
