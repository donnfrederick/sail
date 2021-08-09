class PointTransaction < ApplicationRecord
  TYPE_CONSUMED = "ConsumedPointTransaction".freeze
  TYPE_RETRIEVED = "RetrievedPointTransaction".freeze

  belongs_to :issue
  belongs_to :conversation
  belongs_to :conversation_request, optional: true
  belongs_to :consumed_point_transaction, optional: true

  scope :by_conversation_id, ->(conversation_id) { where(conversation_id: conversation_id) }
  scope :by_points, ->(points) { where(points: points) }
  scope :available, -> { where(deleted_at: nil) }

  before_validation :set_default_values, on: :create

  def available?
    self.deleted_at.nil?
  end

  private

    def set_default_values
      self.conversation ||= conversation_request.conversation unless conversation_request.nil?
    end
end
