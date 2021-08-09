module Videos
  class Compilation
    attr_reader :conversation

    def self.idling?
      !Conversation.encoding.exists?
    end

    def self.next_queue
      conversation = Conversation.encoding_queued.sorted.first
      new(conversation) if conversation.present?
    end

    def initialize(conversation)
      @conversation = conversation
    end

    def execute
      begin
        clear_tmp_dir
        mark_progress!

        session_movies = execute_session_movies
        whole_movie = if session_movies.empty?
                        mark_skipped!
                      elsif session_movies.count > 1
                        first_session_movie = session_movies.shift
                        session_movie_files = session_movies.map {|m| m.file }
                        first_session_movie.concat(session_movie_files, tmp_video_file)
                      else
                        session_movies.shift
                      end

        if whole_movie.present?
          conversation.assign_video = whole_movie.file
          mark_completed!
        else
          mark_skipped!
        end
      rescue => e
        error_log(e)
        mark_failed!
      end
    end

    private

      def mark_progress!
        conversation.compilation_status = Conversation::STATUS_COMP_PROGRESS
        conversation.save!

        Rails.logger.debug "[Compilation] #{conversation.channel_id} has started"
      end

      def mark_failed!
        conversation.compilation_status = Conversation::STATUS_COMP_FAILED
        conversation.save!

        Rails.logger.error "[Compilation] #{conversation.channel_id} has failed"
      end

      def mark_completed!
        conversation.compilation_status = Conversation::STATUS_COMP_COMPLETED
        conversation.save!

        Rails.logger.debug "[Compilation] #{conversation.channel_id} has done"
      end

      def mark_skipped!
        conversation.compilation_status = Conversation::STATUS_COMP_SKIPPED
        conversation.save!

        Rails.logger.debug "[Compilation] #{conversation.channel_id} has been skipped"
      end

      def execute_session_movies
        conversation
          .talking_sessions
          .map {|s| SessionCompilation.new(s, black_picture_file, tmp_dir).dual_view }
          .select {|m| m.present? }
      end

      def error_log(e)
        Rails.logger.error e.to_json
      end

      def tmp_video_file
        Utils.random_filename(tmp_dir, ".mp4")
      end

      def tmp_dir
        path = Rails.root.to_path + "/tmp/videos"
        FileUtils.mkdir_p(path, {mode: 0777}) unless Dir.exists?(path)

        path
      end

      def clear_tmp_dir
        FileUtils.remove_entry_secure(tmp_dir)
      end

      def black_picture_file
        Rails.root.to_path + "/assets/black.png"
      end
  end
end
