class ApplyDataToPackageProperties < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    return if package_property_exists?

    data_package_properties
    data_pricing_tables
  end

  private

    def package_property_exists?
      PackageProperty.exists?
    end

    def data_package_properties
      ConversationPackage.reset_column_information

      suffix = "_property_id".freeze
      property_names = ConversationPackage.column_names.select {|n| n.include? suffix }
      grade_names = property_names.map {|name| name[0, name.length - suffix.length] }

      packages = {}

      grade_names.each do |grade_name|
        Package.where("name LIKE '%_#{grade_name}'").find_each do |package|
          name = package.name[0, package.name.length - grade_name.length - 1]
          column = (grade_name + suffix).to_sym
          package_property = PackageProperty.create(
            original_price: package.original_price,
            discounted_price: package.discounted_price,
            currency: package.currency,
            duration: package.duration,
            original_conversations: package.original_conversations,
            bonus_conversations: package.bonus_conversations,
            )
          packages[name] = {} if packages[name].nil?
          packages[name][column] = package_property.id
        end
      end

      packages.keys.each do |package_name|
        attrs = packages[package_name].merge(name: package_name)
        ConversationPackage.create(attrs)
      end
    end

    def data_pricing_tables
      ConversationPackage.reset_column_information
      PricingTable.reset_column_information

      prefixes = %w[individual_student coupon_individual_student]
      middles = %w[once twice beginner light regular frequent]
      prefixes.each do |prefix|
        pricing_table = PricingTable.new(name: "pricing table ##{PricingTable.count + 1}", admin_user: AdminUser.first)
        middles.each_with_index do |middle, index|
          conversation_package = ConversationPackage.find_by(name: "#{prefix}_#{middle}_package")
          conversation_package = ConversationPackage.create! if conversation_package.nil?
          pricing_table.send("package_#{(index + 1)}_id=", conversation_package.id)
          pricing_table.send("package_#{(index + 1)}_name=", middle.capitalize)
        end
        pricing_table.save!
      end
    end
end
