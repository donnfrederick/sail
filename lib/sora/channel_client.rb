module Sora
  class ChannelClient
    attr_reader :role, :multistream, :channel_id, :client_id,
                :connection_id, :audio, :video, :minutes, :event_metadata

    def initialize(channel_client_hash)
      @role = channel_client_hash["role"] if channel_client_hash["role"].present?
      @multistream = channel_client_hash["multistream"] if channel_client_hash["multistream"].present?
      @channel_id = channel_client_hash["channel_id"] if channel_client_hash["channel_id"].present?
      @client_id = channel_client_hash["client_id"] if channel_client_hash["client_id"].present?
      @connection_id = channel_client_hash["connection_id"] if channel_client_hash["connection_id"].present?
      @audio = channel_client_hash["audio"] if channel_client_hash["audio"].present?
      @video = channel_client_hash["video"] if channel_client_hash["video"].present?
      @minutes = channel_client_hash["minutes"].nil? ? 0 : channel_client_hash["minutes"]
      @event_metadata = channel_client_hash["event_metadata"] if channel_client_hash["event_metadata"].present?
    end
  end
end
