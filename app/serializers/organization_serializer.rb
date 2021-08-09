class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :industry, :country, :name_ja, :name_en, :name_kana,
             :created_at, :updated_at

  has_many :organization_sections
  has_many :organization_devices

  has_many :users
end
