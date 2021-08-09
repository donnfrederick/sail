class Conversation
  def talking_sessions
    @talking_sessions ||= all_sessions.select {|session| session.talking? }
  end

  def all_sessions
    unless @all_sessions.present?

      @all_sessions = []
      session = nil
      video_chunks.each do |video_chunk|
        if session.nil?
          session = ::Videos::Session.new(video_chunk)
          @all_sessions << session
        elsif session.duplicated? video_chunk
          session.add video_chunk
          session = nil
        else
          session = ::Videos::Session.new(video_chunk)
          @all_sessions << session
        end
      end
    end

    @all_sessions
  end

  def assign_video=(file)
    File.open(file) {|f| self.video = f }
    self.save!
  end
end
