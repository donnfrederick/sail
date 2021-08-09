module Videos
  class Session
    def initialize(first_chunk)
      @video_chunks = [first_chunk]
      @start_time = nil
    end

    def talking?
      @video_chunks.count > 1
    end

    def alone?
      !talking?
    end

    def add(later_chunk)
      if duplicated? later_chunk
        @video_chunks << later_chunk
        @start_time = later_chunk.start_at
      end
    end

    def later
      if @video_chunks[0].end_at < @video_chunks[1].end_at
        @video_chunks[1]
      else
        @video_chunks[0]
      end
    end

    def earlier
      if @video_chunks[0].end_at < @video_chunks[1].end_at
        @video_chunks[0]
      else
        @video_chunks[1]
      end
    end

    def duration
      stop_time - start_time
    end

    def start_time
      @start_time
    end

    def stop_time
      earlier.end_at
    end

    def duplicated?(additional_chunk)
      first_chunk = @video_chunks[0]
      first_chunk.start_at <= additional_chunk.start_at && first_chunk.end_at > additional_chunk.start_at
    end

    def start_offset(video_chunk)
      start_time - video_chunk.start_at
    end

    def name
      channel_id = @video_chunks[0].conversation.channel_id
      client_id = @video_chunks[0].client_id

      channel_id + "#" + client_id
    end
  end
end