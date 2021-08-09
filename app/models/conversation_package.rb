# == Schema Information
#
# Table name: conversation_packages
#
#  id                   :bigint           not null, primary key
#  name                 :string(255)
#  gold_property_id     :bigint
#  member_property_id   :bigint
#  platinum_property_id :bigint
#  silver_property_id   :bigint
#
# Indexes
#
#  index_conversation_packages_on_gold_property_id      (gold_property_id)
#  index_conversation_packages_on_member_property_id    (member_property_id)
#  index_conversation_packages_on_platinum_property_id  (platinum_property_id)
#  index_conversation_packages_on_silver_property_id    (silver_property_id)
#
class ConversationPackage < ApplicationRecord
  belongs_to :member_property,   class_name: "PackageProperty"
  belongs_to :silver_property,   class_name: "PackageProperty"
  belongs_to :gold_property,     class_name: "PackageProperty"
  belongs_to :platinum_property, class_name: "PackageProperty"

  scope :by_name, ->(name) { where(name: name) }

  def self.create!(complex_attrs = nil)
    complex_attrs = {} if complex_attrs.nil?

    transaction do
      conversation_package = new
      property_column_names.each do |property_column_name|
        key = property_column_name.sub(/_property_id$/, "").to_sym
        package_property = if complex_attrs[key].nil?
                             PackageProperty.create!
                           else
                             PackageProperty.create!(complex_attrs[key])
                           end
        conversation_package.send("#{property_column_name}=", package_property.id)
      end
      conversation_package.save!

      conversation_package
    end
  end

  def properties
    @properties ||= ConversationPackage.property_column_names.map {|n| send(n.sub(/_id$/, "")) }
  end

  def label
    [
      member_property.price,
      silver_property.price,
      gold_property.price,
      platinum_property.price,
    ].map {|price| "$ #{price}" }.join(" > ")
  end

  def available_for(user)
    send("#{user.grade.name.downcase}_property")
  end

  private

    def self.property_column_names
      column_names.select {|n| n.include? "_property" }
    end
end
