module Videos
  class Encoder
    attr_reader :ffmpeg, :file, :max_muxing_queue_size

    def initialize(file)
      @file = file
      @ffmpeg = ::FFMPEG::Movie.new file
      @max_muxing_queue_size = 500
    end

    def max_muxing_queue_size=(size)
      @max_muxing_queue_size = size
    end

    def safe_transcode(save_as, options = [], transcoder_options = nil)
      begin
        if options.present?
          options += [ "-max_muxing_queue_size", max_muxing_queue_size.to_s ] if options.exclude?('-vn')

          if transcoder_options.present?
            Encoder.new save_as if ffmpeg.transcode(save_as, options, transcoder_options)
          else
            Encoder.new save_as if ffmpeg.transcode(save_as, options)
          end
        else
          Encoder.new save_as if ffmpeg.transcode(save_as)
        end
      rescue => e
        error_log(e)
        ::File.delete(save_as) if ::File.exist?(save_as)
        nil
      end
    end

    def concat(files, save_as)
      return self if files.empty?

      options = []
      files.each do |f|
        options << "-i"
        options << f
      end

      safe_transcode(save_as, options)
    end

    def cut(offset, duration, save_as)
      options = [
        "-ss",
        TimeCode.from_seconds(offset).to_s,
        "-t",
        TimeCode.from_seconds(duration).to_s
      ]

      safe_transcode(save_as, options)
    end

    def transcode_video(save_as)
      options = %w[-async 1 -vsync 1]
      safe_transcode(save_as, options)
    end

    def transcode_audio(save_as)
      options = %w[-async 1]
      safe_transcode(save_as, options)
    end

    def change_tempo(save_as, ratio)
      options = [
        "-vf",
        "setpts=PTS/" + ratio.to_s,
        "-af",
        "atempo=" + ratio.to_s
      ]
      safe_transcode(save_as, options)
    end

    private

      def error_log(e)
        Rails.logger.error e.to_json
      end
  end
end