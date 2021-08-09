module Videos
  class SessionCompilation
    attr_reader :session, :dimension, :picture_file, :tmp_dir

    def initialize(session, picture_file, tmp_dir)
      @session = session
      @picture_file = picture_file
      @dimension = Dimension.new(320, 240)
      @tmp_dir = tmp_dir
    end

    def dimension=(value)
      @dimension = value
    end

    def dual_view
      left_ratio, right_ratio = tempo_ratio_list

      Rails.logger.debug("[COMPILATION] left screen is now being compiled")
      left = make_scene(session, session.earlier, left_ratio)
      Rails.logger.debug("[COMPILATION] right screen is now being compiled")
      right = make_scene(session, session.later, right_ratio)
      Rails.logger.debug("[COMPILATION] both side is now being merged")
      dual_video(left, right) if left.present? && right.present?
    end

    private

      def tempo_ratio_list
        encoder = Encoder.new session.earlier.local_file
        earlier_real_duration = encoder.ffmpeg.duration

        encoder = Encoder.new session.later.local_file
        later_real_duration = encoder.ffmpeg.duration

        if earlier_real_duration < later_real_duration
          [earlier_real_duration / later_real_duration, 1.0]
        elsif earlier_real_duration > later_real_duration
          [1.0, later_real_duration / earlier_real_duration]
        else
          [1.0, 1.0]
        end
      end

      def make_scene(session, video_chunk, ratio)
        encoder = Encoder.new video_chunk.local_file
        Rails.logger.debug("[COMPILATION] formalizing")
        encoder = formalize(encoder, tmp_video_file)
        if encoder.present?
          Rails.logger.debug("[COMPILATION] change tempo")
          unless ratio == 1.0
            encoder = encoder.change_tempo(tmp_video_file, ratio)
          end
          if encoder.present?
            Rails.logger.debug("[COMPILATION] standardizing")
            encoder = standardize(encoder, tmp_video_file)
            if encoder.present?
              offset = session.start_offset(video_chunk)
              duration = session.duration
              Rails.logger.debug("[COMPILATION] cutting")
              encoder.cut(offset, duration, tmp_video_file)
            end
          end
        else
          Rails.logger.debug("[COMPILATION] something error happened")
        end
      end

      def formalize(encoder, save_as)
        if encoder.ffmpeg.video_stream.nil?
          Rails.logger.debug("[COMPILATION] video has not detected, it is an audio file")
          audio_encoder = encoder.transcode_audio(tmp_video_file)
          Rails.logger.debug("[COMPILATION] formalize_audio")
          movie_encoder = formalize_audio(audio_encoder, tmp_video_file)
          return if movie_encoder.nil?
          encoder = movie_encoder
        end

        Rails.logger.debug("[COMPILATION] transcode_video")
        encoder.transcode_video(save_as)
      end

    # 音声のみのファイルにpicture_fileの固定映像を加えて映像ファイルにする
      def formalize_audio(encoder, save_as)
        options = %w[-vn -acodec libfdk_aac]
        encoder = encoder.safe_transcode(save_as, options)
        return if encoder.nil?

        options = [
          "-loop",
          "1",
          "-i",
          picture_file,
          "-i", encoder.file,
          "-c:v",
          "libx264",
          "-tune",
          "stillimage",
          "-c:a",
          "libfdk_aac",
          "-pix_fmt",
          "yuv420p",
          "-shortest"
        ]
        encoder.safe_transcode(save_as, options)
      end

      def standardize(encoder, save_as)
        options = [
          "-vf", "scale='iw*min(" + dimension.width.to_s + "/iw\," + dimension.height.to_s + "/ih)':'ih*min(" + dimension.width.to_s + "/iw\," + dimension.height.to_s + "/ih)',pad=" + dimension.width.to_s + ":" + dimension.height.to_s + ":'(" + dimension.width.to_s + "-iw)/2':'(" + dimension.height.to_s + "-ih)/2'",
          "-async", "1",
          "-metadata:s:v:0", "start_time=0"
        ]
        encoder.safe_transcode(save_as, options)
      end

      def dual_video(left_encoder, right_encoder)
        options = [
          "-i",
          right_encoder.file,
          "-filter_complex",
          "[0:v]setpts=PTS-STARTPTS, pad=iw*2:ih[bg]; [1:v]setpts=PTS-STARTPTS[fg]; [bg][fg]overlay=w; [0:a][1:a]amerge=inputs=2,pan=stereo|c0<c0+c2|c1<c1+c3[aout]",
          "-map",
          "[aout]"
        ]
        save_as = tmp_video_file
        left_encoder.safe_transcode(save_as, options)
      end

      def tmp_video_file
        Utils.random_filename(tmp_dir, ".mp4")
      end
  end
end