# == Schema Information
#
# Table name: chats
#
#  id              :bigint           not null, primary key
#  content         :text(65535)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  conversation_id :bigint
#  user_id         :bigint
#
# Indexes
#
#  index_chats_on_conversation_id  (conversation_id)
#  index_chats_on_user_id          (user_id)
#
class Chat < ApplicationRecord
  belongs_to :conversation
  belongs_to :user
end
