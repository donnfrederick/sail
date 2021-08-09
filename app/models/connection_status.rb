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
