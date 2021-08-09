class PricingTable < ApplicationRecord
  acts_as_paranoid

  belongs_to :admin_user
  belongs_to :package_1, class_name: "ConversationPackage"
  belongs_to :package_2, class_name: "ConversationPackage"
  belongs_to :package_3, class_name: "ConversationPackage"
  belongs_to :package_4, class_name: "ConversationPackage"
  belongs_to :package_5, class_name: "ConversationPackage"
  belongs_to :package_6, class_name: "ConversationPackage"

  has_many :coupons_pricing_tables
  has_many :coupons, through: :coupons_pricing_tables

  scope :disconnected, -> { left_joins(:coupons_pricing_tables).where(coupons_pricing_tables: {coupon_id: nil}) }

  def self.create!(complex_attrs)
    transaction do
      permitted_attrs = complex_attrs.select {|k, _v| column_names.include?("#{k}") }
      pricing_table = new(permitted_attrs)
      package_column_names.each do |package_column_name|
        key = package_column_name.sub(/_id$/, "").to_sym
        package = if complex_attrs[key].nil?
                    ConversationPackage.create!
                  else
                    ConversationPackage.create!(complex_attrs[key])
                  end
        pricing_table.send("#{package_column_name}=", package.id)
      end
      pricing_table.save!

      pricing_table
    end
  end

  def self.find_by_coupon_code(coupon_code)
    includes(coupons_pricing_tables: :coupons).where(coupons: {code: coupon_code}).first
  end

  def packages
    @packages ||= PricingTable.package_column_names.map {|n| send(n.sub(/_id$/, "")) }
  end

  def package_names
    PricingTable.column_names.select {|n| n.include?("package_") && n.include?("_name") }.map do |name|
      send(name)
    end
  end

  def update_package!(nth, complex_attrs)
    transaction do
      new_package = ConversationPackage.create!(complex_attrs)
      send("package_#{nth}_id=", new_package.id)
      save!
    end
  end

  private

    def self.package_column_names
      column_names.select {|n| n.include?("package_") && n.exclude?("_name") }
    end
end
