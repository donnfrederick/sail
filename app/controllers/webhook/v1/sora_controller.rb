module Webhook
  module V1
    class SoraController < WebhookController
      def connection
        case params[:type]
        when "connection.created"
          if established? && conversation_exists?
            recording_start
            render json: {}, status: :created
            return
          end
        end

        head :no_content
      end

      def archives
        if params[:archives].present?
          if conversation.present?
            begin
              since = Time.at(params[:created_at].to_i)
              params[:archives].each do |archive|
                chunk = ::Sora::ArchivesVideoChunkFactory.create_video_chunk(conversation, since, archive)
                chunk.save
              end
              conversation.compilation_status = Conversation::STATUS_COMP_QUEUED
              conversation.save
              render json: {}, status: :created
            rescue => e
              Rails.logger.debug(e.to_json)
              conversation.compilation_status = Conversation::STATUS_COMP_FAILED
              conversation.save
              render json: {}, status: :internal_server_error
            end
          else
            render json: {}, status: :not_found
          end
          return
        end

        head :no_content
      end

      def established?
        2 <= params[:data][:channel_connections].to_i
      end

      def conversation
        @conversation ||= Conversation.where(channel_id: params[:channel_id]).first
      end

      def conversation_exists?
        conversation.present?
      end

      def recording_start
        Sora::Recording.start(params[:channel_id])
      end
    end
  end
end
