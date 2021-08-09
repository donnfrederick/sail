class AddConversationRequestIdToPointTransactions < ActiveRecord::Migration[5.2]
  def change
    add_reference :point_transactions, :conversation_request, index: true
    add_reference :point_transactions, :consumed_point_transaction, index: true
    change_column :point_transactions, :points, :integer, default: 1
  end

  def data
    PointTransaction.reset_column_information

    ConsumedPointTransaction.where.not(conversation_id: nil).find_each do |p|
      unless p.conversation.nil?
        p.conversation_request = p.conversation.requests.first
        p.save!
      end
    end
  end
end
