class ConversationsMemo < ApplicationRecord
  belongs_to :users_conversation

  scope :by_users_conversation, ->(users_conversation) {
    where(users_conversation_id: users_conversation.id)
  }

  def update_memo(memo)
    update(memo: memo)
  end
end
