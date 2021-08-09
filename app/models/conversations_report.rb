class ConversationsReport < ApplicationRecord
  # TODO users_conversation_idと関連付けし、conversationには直接つながない
  belongs_to :from_user, class_name: "User", foreign_key: "from_user_id"
  belongs_to :to_user,   class_name: "User", foreign_key: "to_user_id"
  belongs_to :conversation
  has_many :conversations_report_reasons

  def self.create(conversation, from_user_id: nil, to_user_id: nil, reasons: [], detail: "", block_requested: false)
    report = new({
                       conversation_id: conversation.id,
                       from_user_id: from_user_id,
                       to_user_id: to_user_id,
                       detail: detail,
                       block_requested: block_requested
                     })
    if report.save
      reasons.each do |reason_id|
        ar = ConversationsReportReason.new({
                                    conversations_report_id: report.id,
                                    reason_id: reason_id
                                  })
        ar.save!
      end
    end

    report
  end

  def self.update(conversation, from_user_id: nil, to_user_id: nil, reasons: [], detail: "", block_requested: false)
    report = where(conversation_id: conversation.id, from_user_id: from_user_id).first
    if report.present?
      report.detail = detail
      report.block_requested = block_requested unless report.block_requested
      if report.save
        report.update_reasons(reasons)

        if !report.block_requested && block_requested
          Block.new(from_user_id: from_user_id, to_user_id: to_user_id).save
        end
      end
    end

    report
  end

  def update_reasons(new_reasons)
    ConversationsReportReason
      .where(conversations_report_id: id, reason_id: reasons - new_reasons)
      .destroy_all

    (new_reasons - reasons).each do |reason_id|
      ar = ConversationsReportReason.new({
                                           conversations_report_id: id,
                                           reason_id: reason_id
                                         })
      ar.save!
    end
  end

  def reasons
    conversations_report_reasons.map {|r| r.reason_id }
  end
end
