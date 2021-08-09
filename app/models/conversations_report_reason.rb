# == Schema Information
#
# Table name: conversations_report_reasons
#
#  id                      :bigint           not null, primary key
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  conversations_report_id :bigint
#  reason_id               :integer
#
# Indexes
#
#  conversations_report_reason_index                              (conversations_report_id,reason_id) UNIQUE
#  index_conversations_report_reasons_on_conversations_report_id  (conversations_report_id)
#
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
