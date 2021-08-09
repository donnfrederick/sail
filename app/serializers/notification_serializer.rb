class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :image_url, :title, :body, :notificated_at, :conversation_id, :notification_type
end
