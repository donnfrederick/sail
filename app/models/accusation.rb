class Accusation < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions

  belongs_to :from_user, class_name: "User", foreign_key: "from_user_id"
  belongs_to :to_user,   class_name: "User", foreign_key: "to_user_id"
  belongs_to :conversation
  belongs_to :accusation_reason

  def self.create(conversation, from_user_id: nil, to_user_id: nil, reasons: [], detail: "")
    accusation = new({
      conversation_id: conversation.id,
      from_user_id: from_user_id,
      to_user_id: to_user_id,
      detail: detail
        })
    if accusation.save
      reasons.each do |reason_id|
        ar = AccusationReason.new({
                                    accusation_id: accusation.id,
                                    reason_id: reason_id
                                  })
        ar.save!
      end

      accusation
    end
  end
end
