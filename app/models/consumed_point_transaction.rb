class ConsumedPointTransaction < PointTransaction
  acts_as_paranoid

  delegate :consume!,  to: :issue, prefix: true

  before_validation :set_default_values
  validate :be_unique_available
  after_create :issue_consume!

  private

    def be_unique_available
      return unless self.new_record?
      return if self.conversation_request.present? && self.conversation_request.consumed_point_transaction.nil?
      return if self.conversation_request.nil? && self.conversation.consumed_point_transactions.available.empty?

      errors[:base] << I18n.t("errors.point_transaction.duplicate_consumption", conversation_id: self.conversation_id)
    end

    def set_default_values
      self.conversation ||= self.conversation_request.try(:conversation)
      self.issue ||= (self.conversation_request.try(:from_user) || self.conversation.student).try(:available_issues).try(:first)
    end
end
