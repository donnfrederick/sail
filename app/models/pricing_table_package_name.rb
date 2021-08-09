class PricingTablePackageName < ApplicationRecord
  belongs_to :admin_user

  before_validation :sanitize_names

  private

    def sanitize_names
      2.upto 9 do |i|
        value = send("package_#{i}_name")
        send("package_#{i}_name=", nil) if !value.nil? && value.empty?
      end
    end
end
