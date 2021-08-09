# == Schema Information
#
# Table name: users_conversations
#
#  id              :bigint(8)        not null, primary key
#  user_id         :bigint(8)
#  conversation_id :bigint(8)
#  evaluation      :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  onlined         :boolean          default(FALSE), not null
#  is_late         :boolean          default(FALSE), not null
#

class UsersConversation < ApplicationRecord
  belongs_to :user
  belongs_to :conversation
  has_one :evaluation
  has_one :conversations_memo

  scope :organization_by, ->(organization) {
    section_ids = organization.organization_sections.pluck(:id)
    user_ids = ::UsersOrganizationSection.where(id: section_ids).pluck(:user_id)
    where(user_id: user_ids)
  }

  scope :by_user, ->(user) {
    where(user_id: user.id)
  }

  scope :only_absent, -> {
    where(onlined: false)
  }

  # 遅刻判定
  def late?
    if !onlined && user.online? &&
      (conversation.start_at + Conversation::LATE_TIME) < Time.zone.now
      true
    else
      false
    end
  end

  def late!
    update(onlined: true ,is_late: true)
  end

  def evaluate(params)
    filtered_params = params.select{|k, _| k != 'quality' }
    filtered_params[:users_conversation_id] = self.id
    ev = Evaluation.find_by(users_conversation_id: self.id)
    if ev.present?
      ev.update(filtered_params)
    else
      ev = Evaluation.new(filtered_params)
      ev.save!
    end

    ev.update_qualities(params[:quality]) if params[:quality].present?
  end
end
