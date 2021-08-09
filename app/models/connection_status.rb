# == Schema Information
#
# Table name: connection_statuses
#
#  id              :bigint           not null, primary key
#  media           :string(255)      not null
#  minutes         :integer          default(0)
#  requested_at    :datetime         not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  client_id       :string(255)      not null
#  conversation_id :bigint
#
# Indexes
#
#  index_connection_statuses_on_conversation_id  (conversation_id)
#
class ConnectionStatus < ApplicationRecord
  belongs_to :conversation

  def self.create_from_channel_client(conversation, channel_client, requested_at)
    create(
      conversation: conversation,
      client_id: channel_client.client_id,
      minutes: channel_client.minutes,
      media: channel_client.video ? "video+audio" : "audio",
      requested_at: requested_at,
    )
  end
end
