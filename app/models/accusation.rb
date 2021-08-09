# == Schema Information
#
# Table name: accusations
#
#  id                   :bigint           not null, primary key
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  accusation_reason_id :bigint
#  conversation_id      :bigint
#  from_user_id         :bigint
#  to_user_id           :bigint
#
# Indexes
#
#  index_accusations_on_accusation_reason_id  (accusation_reason_id)
#  index_accusations_on_conversation_id       (conversation_id)
#  index_accusations_on_from_user_id          (from_user_id)
#  index_accusations_on_to_user_id            (to_user_id)
#
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
