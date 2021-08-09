ActiveAdmin.register_page "Sora" do

  menu false

  page_action :disconnect_channel, method: :post do

    if params[:conversation_id].present?
      conversation = Conversation.find_by(id: params[:conversation_id])
      if conversation.present?
        ::Sora::Connection.disconnect_channel(conversation.channel_id, "admin-#{current_admin_user.id}")
        redirect_to admin_conversation_path(conversation)
      else
        redirect_to admin_conversations_path
      end
    else
      redirect_to admin_conversations_path
    end
  end

  page_action :disconnect_client, method: :post do

    if params[:conversation_id].present? && params[:client_id].present?
      conversation = Conversation.find_by(id: params[:conversation_id])
      if conversation.present?
        ::Sora::Connection.disconnect_client(conversation.channel_id, params[:client_id], "admin-#{current_admin_user.id}")
        redirect_to admin_conversation_path(conversation)
      else
        redirect_to admin_conversations_path
      end
    else
      redirect_to admin_conversations_path
    end
  end
end
