module Sora
  class ArchivesVideoChunkFactory

    def self.create_video_chunk(conversation, since, archive)
      info = {
        client_id:  archive[:client_id],
        filename:   archive[:filename],
        start_time: since + archive[:start_time_offset].to_i,
        stop_time:  since + archive[:stop_time_offset].to_i,
      }

      chunk = VideoChunk.new(translate(info))
      chunk.conversation_id = conversation.id
      chunk
    end

    def self.translate(data)
      [:start_time, :stop_time].each do |time_attr|
        data[time_attr] = Time.at(data[time_attr].to_i).getutc if data[time_attr].present?
      end

      [[:file, :filename], [:start_at, :start_time], [:end_at, :stop_time]].each do |pair|
        if data[pair[1]].present?
          data[pair[0]] = data[pair[1]]
          data.delete(pair[1])
        end
      end

      data[:media_type] = "video"
      data
    end
  end
end
