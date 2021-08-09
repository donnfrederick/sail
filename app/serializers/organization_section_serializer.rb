class OrganizationSectionSerializer < ActiveModel::Serializer
  attributes :id, :organization_id, :name_ja, :name_en,
             :created_at, :updated_at

  belongs_to :organization
end
