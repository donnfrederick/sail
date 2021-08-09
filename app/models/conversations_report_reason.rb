class ConversationsReportReason < ApplicationRecord
  belongs_to :conversations_report

  IDS = [
    SOLICITATION = 1, # 他サービスへの勧誘行為
    SPAM = 2,         # スパム・宣伝目的
    SEXUAL = 3,       # 出会い・わいせつ目的
    CRIMINAL = 4,     # 犯罪・違法行為
    OTHER = 5,        # その他、迷惑行為
  ].freeze
end
