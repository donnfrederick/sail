class AddApprovedAndRejectedToConversationRequests < ActiveRecord::Migration[5.2]
  def change
    # NOTE: statusカラムではなく、ロジックコードを最小限にするためにあえてカラムを分けています
    # INFO: 競合する他のconversation_requestsがapprovedになった際にはrejectedをtrueにします (暗示的なrejectedもtrueにする)
    add_column :conversation_requests, :approved, :boolean, default: false, index: true
    add_column :conversation_requests, :rejected, :boolean, default: false, index: true
  end
end
