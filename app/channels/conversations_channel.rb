class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
    # TODO 本来はAppearanceChannel.subscribeが正常に叩かれるように対応すべき
    current_user.appear unless current_user.online?
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # TODO 本来はAppearanceChannel.unsubscribedが正常に叩かれるように対応すべき
    current_user.disappear if current_user.online?
  end

  # 会話を開始する
  def open
    return nil if conversation.nil?

    conversation.broadcast_open
  end

  # 会話終了1分前
  def close_soon
    conversation.broadcast_close_soon
  end

  # 会話を終了する
  def close
    conversation.broadcast_close
  end

  # 通話モード (映像 or 音声のみ) を切り替える
  def change_mode(data)
    return nil if conversation.nil?

    body = {
      channel: self.class.name,
      action:  :change_mode,
      mode:    data["mode"],
    }

    conversation.users.each do |user|
      self.class.broadcast_to user, body
    end
  end

  # トークテーマを選ぶ
  def topic_open
    return nil if conversation.nil?

    topics = Hash[*conversation.common_topics.map {|t| [t.name_en, t.name_ja] }.flatten]

    body = {
      channel: self.class.name,
      action:  :topic_open,
      topics:  topics,
    }

    conversation.users.each do |user|
      self.class.broadcast_to user, body
    end
  end

  # トークテーマが選択された
  def topic_select(data)
    return nil if conversation.nil?

    body = {
      channel: self.class.name,
      action:  :topic_select,
      topic:   data["topic"],
    }

    conversation.users.each do |user|
      self.class.broadcast_to user, body
    end
  end

  # トークテーマの選択を中断した
  def topic_close
    return nil if conversation.nil?

    body = {
      channel: self.class.name,
      action:  :topic_closed,
    }

    conversation.users.each do |user|
      self.class.broadcast_to user, body
    end
  end

  # 現在の会話の終了時刻、現在のサーバー時刻
  def remaining_time
    if conversation.nil?
      now  = Time.zone.now
      body = {
        channel:            self.class.name,
        action:             :remaining_time,
        end_at:             nil,
        end_at_epoch:       nil,
        current_time:       now.to_s(:iso8601),
        current_time_epoch: now.to_i,
      }
      self.class.broadcast_to current_user, body
    else
      conversation.users.each do |user|
        user.set_timezone
        end_at = conversation.end_at
        now    = Time.zone.now

        body = {
          channel:            self.class.name,
          action:             :remaining_time,
          end_at:             Time.zone.iso8601(end_at.iso8601),
          end_at_epoch:       end_at.to_i,
          current_time:       now.to_s(:iso8601),
          current_time_epoch: now.to_i,
        }
        self.class.broadcast_to user, body
      end
    end
  end

  def start_button_pressed
    return unless conversation.started? # just in case

    conversation.appear!(current_user.type.downcase)
    return if conversation.talked?

    # OPTIMIZE: 非同期で処理を行うべきです
    service = ConversationStatusCheckService.new conversation
    service.check!
  end

  def update_chats(data)
    conversation.reload
    conversation.chats.create(user: current_user, content: data["chats"])

    body = {
      channel: "ConversationsChannel",
      action:  :update_chats,
      chats: ConversationSerializer.new(conversation).chats
    }

    conversation.users.each do |user|
      self.class.broadcast_to user, body
    end
  end

  protected

    def conversation
      if Rails.env == "development"
        @conversation ||= current_user.visible_conversations.last
      else
        @conversation ||= current_user.visible_conversations.current.first
      end
      # @conversation ||= current_user.visible_conversations.current.first
    end
end
