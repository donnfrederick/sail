class Conversation < ApplicationRecord
  has_many :connection_statuses

  def self.update_connection_statuses
    current.find_each do |conversation|
      conversation.update_connection_status
    end
  end

  def update_connection_status
    channel_clients = ::Sora::Connection.request_connection_peers(self.channel_id)
    return if channel_clients.nil?

    requested_at = Time.now
    channel_clients.each do |channel_client|
      ConnectionStatus.create_from_channel_client(self, channel_client, requested_at)
    end
  end
end
