class RetrievedPointTransaction < PointTransaction
  acts_as_paranoid

  delegate :retrieve!, to: :issue, prefix: true
  delegate :destroy!, to: :consumed_point_transaction, prefix: true

  validate :consumption_must_exist
  after_create :issue_retrieve!
  after_create :consumed_point_transaction_destroy!

  private

    def consumption_must_exist
      return unless self.new_record?
      return unless consumed_point_transaction.nil? || self.issue.nil?

      errors[:base] << I18n.t("errors.point_transaction.no_available_consumption_history", conversation_id: self.conversation_id)
    end

    def set_default_values
      super

      self.consumed_point_transaction ||= conversation_request.try(:consumed_point_transaction) || conversation.try(:consumed_point_transactions).try(:available).try(:first)
      self.issue ||= consumed_point_transaction.try(:issue)
    end
end
