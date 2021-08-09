module Structs
  # 複数のconversationの塊
  class Schedule
    attr_reader :owener

    def initialize(owener)
      @schedule = {}
      @owener = owener
    end

    def add(conversation)
      interval = (conversation.end_at - conversation.start_at).to_i / 1800
      (0..interval).each do |diff|
        start_at = conversation.start_at + (diff * 30).minutes
        minutes = start_at.strftime("%M").to_i
        floor = if minutes < 30
                  start_at - minutes.minutes
                else
                  start_at + (minutes - 30).minutes
                end
        @schedule[floor.utc.to_s] = conversation
      end

      @schedule[conversation.start_at.utc.to_s] = conversation
    end

    def remove(conversation)
      if exists_at?(conversation.start_at)
        @schedule.delete(conversation.start_at.to_s)
      end
    end

    def conversation_at(time)
      key = time.utc.to_s
      return nil unless @schedule[key].present?

      @schedule[key]
    end

    def opening_at?(time)
      conversation = @schedule[time.utc.to_s]
      return false unless conversation.present?
      return true if conversation.is_a?(AmbushConversation)

      conversation.status_waiting?
    end

    def matched_at?(time)
      conversation = @schedule[time.utc.to_s]
      case
      when conversation.blank?
        false
      when conversation.is_a?(AmbushConversation)
        false
      when conversation.status_waiting?
        false
      when conversation.status_cancelled?
        false
      else
        true
      end
    end

    def exists_at?(time)
      @schedule[time.to_s].present?
    end

    def exists?(conversation)
      @schedule[conversation.start_at.to_s].present?
    end
  end
end
