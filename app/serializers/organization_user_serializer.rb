class OrganizationUserSerializer < ActiveModel::Serializer
  attributes :id, :name, :picture_url, :auth_token
end
