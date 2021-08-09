# == Schema Information
#
# Table name: conversations_memos
#
#  id                    :bigint           not null, primary key
#  memo                  :string(255)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  users_conversation_id :bigint
#
# Indexes
#
#  index_conversations_memos_on_users_conversation_id  (users_conversation_id)
#
class ConversationsMemo < ApplicationRecord
  belongs_to :users_conversation

  scope :by_users_conversation, ->(users_conversation) {
    where(users_conversation_id: users_conversation.id)
  }

  def update_memo(memo)
    update(memo: memo)
  end
end
