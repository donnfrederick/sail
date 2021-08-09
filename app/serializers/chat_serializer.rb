class ChatSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :content, :user_picture_url, :created_at, :updated_at

  def user_picture_url
    self.object.user.picture_url
  end
end
