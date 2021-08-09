require "fileutils"

class VideoChunk < ApplicationRecord
  belongs_to :conversation

  # VideoChunkはAPI利用しかないのでi18n対応はなしです。
  validate :valid_time_range, on: :create
  validate :valid_media_type, on: :create

  def s3_url
    @s3_url ||= if ENV["AWS_S3_BUCKET"].empty? || ENV["AWS_REGION"].empty?
                  "/uploads/videos/chunks/#{file}"
                else
                  "https://#{ENV["AWS_S3_BUCKET"]}.s3-#{ENV["AWS_REGION"]}.amazonaws.com/uploads/videos/chunks/#{file}"
                end
  end

  def s3_path
    @s3_path ||= ENV["AWS_S3_BUCKET"] + "/uploads/videos/chunks/" + file
  end

  def local_file
    return @local_file if @local_file.present?

    local_path = tmp_dir + "/" + file
    FileUtils.mkdir_p(tmp_dir, {mode: 0777}) unless Dir.exists?(tmp_dir)

    @local_file = download_s3_file(s3_path, local_path)
  end

  private

    def valid_time_range
      unless start_at.to_i < end_at.to_i
        errors[:base] << "end time (" + end_at.iso8601 + ") is earlier than start time (" + start_at.iso8601 + ") "
      end
    end

    def valid_media_type
      errors[:base] << "video file is not *.webm" unless %w[video audio].include?(media_type)
    end

    def download_s3_file(s3_path, save_as)
      `which aws && aws s3 cp s3://#{s3_path} #{save_as}`
      save_as if File.exists?(save_as)
    end

    def tmp_dir
      @tmp_dir ||= Rails.root.to_path + "/tmp/videos/chunks"
    end
end
