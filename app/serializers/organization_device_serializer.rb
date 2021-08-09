class OrganizationDeviceSerializer < ActiveModel::Serializer
  attributes :id, :model_number, :checkout_at, :return_at
  belongs_to :organization
end
