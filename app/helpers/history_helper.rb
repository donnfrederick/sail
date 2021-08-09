module HistoryHelper
  def self.conversations_in_section(section, since = nil, by = nil)
    since = Time.now.prev_month if since.nil?
    by = since.next_month.beginning_of_month if by.nil?
    user_ids = UsersOrganizationSection.where(organization_section_id: section.id).pluck(:user_id)
    conversation_ids = UsersConversation.where(user_id: user_ids).pluck(:conversation_id)
    Conversation.finished.where(id: conversation_ids).where("start_at >= ?", since).where("end_at < ?", by).order("start_at ASC").all
  end

  def self.conversation_ids_in_section(section, since = nil, by = nil)
    since = Time.now.prev_month if since.nil?
    by = since.next_month.beginning_of_month if by.nil?
    user_ids = UsersOrganizationSection.where(organization_section_id: section.id).pluck(:user_id)
    conversation_ids = UsersConversation.where(user_id: user_ids).pluck(:conversation_id)
    Conversation.finished.where(id: conversation_ids).where("start_at >= ?", since).where("end_at < ?", by).order("start_at ASC").pluck(:id)
  end
end