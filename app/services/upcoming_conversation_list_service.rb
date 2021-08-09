class UpcomingConversationListService < ApplicationService
  attr_reader :context_user, :table_relations

  def initialize(context_user)
    @context_user = context_user
    @table_relations = nil
  end

  def list_by_date(start_on, end_on)
    conversations, start_on, end_on = conversations_by_date(start_on, end_on)
    conversation_requests, _s, _e   = conversation_requests_by_date(start_on, end_on)

    if @table_relations.present?
      conversations         = conversations.includes(@table_relations)
      conversation_requests = conversation_requests.includes(@table_relations)
    end

    conversations = (conversations + conversation_requests).sort_by(&:start_at)
    conversations.reject! {|c| c.current? && c.status_waiting? && c.last_conversation?}

    start_on = first_date(conversations) if start_on.nil?
    end_on = last_date(conversations) if end_on.nil?

    [conversations, start_on, end_on]
  end

  def list_by_term(term, page)
    conversations, start_on, end_on = conversations_by_term(term, page)
    conversation_requests, _s, _e   = conversation_requests_by_term(term, page)

    if @table_relations.present?
      conversations         = conversations.includes(@table_relations)
      conversation_requests = conversation_requests.includes(@table_relations)
    end

    conversations = (conversations + conversation_requests).sort_by(&:start_at)
    conversations.reject! {|c| c.current? && c.status_waiting? }

    start_on = first_date(conversations) if start_on.nil?
    end_on = last_date(conversations) if end_on.nil?

    [conversations, start_on, end_on]
  end

  def list_by_default
    conversations, start_on, end_on = conversations_by_default
    conversation_requests, _s, _e   = conversation_requests_by_default

    if @table_relations.present?
      conversations         = conversations.includes(@table_relations)
      conversation_requests = conversation_requests.includes(@table_relations)
    end

    conversations = (conversations + conversation_requests).sort_by(&:start_at)
    conversations.reject! {|c| c.current? && c.status_waiting? }

    start_on = first_date(conversations) if start_on.nil?
    end_on = last_date(conversations) if end_on.nil?

    [conversations, start_on, end_on]
  end

  def includes(table_relations)
    @table_relations = table_relations
  end

  private

    def current_time
      @current_time ||= Time.now
    end

    def conversations_by_date(start_on, end_on)
      start_on = start_on.in_time_zone.beginning_of_day
      end_on   = end_on.in_time_zone.end_of_day

      conversations = context_user.conversations.
        opened.
        end_at_since(current_time + Conversation::DURATION).
        start_on_by(start_on).
        end_on_by(end_on)

      [conversations, start_on, end_on]
    end

    def conversations_by_term(term, page)
      page = page.presence || 1

      case term
      when Conversation::TERM_WEEKLY
        target_on = Time.zone.now + (page.to_i - 1).weeks
        start_on  = target_on.beginning_of_week(Conversation::START_OF_WEEK)
        end_on    = target_on.end_of_week(Conversation::START_OF_WEEK)
        conversations = context_user.conversations.
          opened.
          start_at_by(current_time - Conversation::DURATION).
          weekly_by(page)

      when Conversation::TERM_MONTHLY
        target_on = Time.zone.now + (page.to_i - 1).months
        start_on  = target_on.beginning_of_month
        end_on    = target_on.end_of_month
        conversations = context_user.conversations.
          opened.
          start_at_by(current_time - Conversation::DURATION).
          monthly_by(page)
      end

      [conversations, start_on, end_on]
    end

    def conversations_by_default
      [context_user.conversations.opened.start_at_by(current_time - Conversation::DURATION), nil, nil]
    end

    def conversation_requests_by_date(start_on, end_on)
      return [[], start_on, end_on] if context_user.teacher?

      start_on = start_on.in_time_zone.beginning_of_day
      end_on   = end_on.in_time_zone.end_of_day

      conversations = ConversationRequest.pending_for(context_user).
        start_at_by(current_time).
        start_on_by(start_on).
        end_on_by(end_on).
        map(&:conversation)

      [conversations, start_on, end_on]
    end

    def conversation_requests_by_term(term, page)
      return [[], Time.now, Time.now] if context_user.teacher?

      page = page.presence || 1

      case term
      when Conversation::TERM_WEEKLY
        target_on = Time.zone.now + (page.to_i - 1).weeks
        start_on  = target_on.beginning_of_week(Conversation::START_OF_WEEK)
        end_on    = target_on.end_of_week(Conversation::START_OF_WEEK)
        conversations = ConversationRequest.pending_for(context_user).
          start_at_by(current_time).
          weekly_by(page).
          map(&:conversation)

      when Conversation::TERM_MONTHLY
        target_on = Time.zone.now + (page.to_i - 1).months
        start_on  = target_on.beginning_of_month
        end_on    = target_on.end_of_month
        conversations = ConversationRequest.pending_for(context_user).
          start_at_by(current_time).
          monthly_by(page).
          map(&:conversation)
      end

      [conversations, start_on, end_on]
    end

    def conversation_requests_by_default
      return [[], Time.now, Time.now] if context_user.teacher?

      conversations = ConversationRequest.pending_for(context_user).
        start_at_by(current_time).
        map(&:conversation)

      [conversations, nil, nil]
    end

    def first_date(conversations)
      conversations.min {|c| c.start_at }.try(:start_at).try(:beginning_of_day) || Time.zone.now.beginning_of_week(Conversation::START_OF_WEEK)
    end

    def last_date(conversations)
      conversations.max {|c| c.start_at }.try(:end_of_day) || Time.zone.now.end_of_week(Conversation::START_OF_WEEK)
    end
end
