module SingleValidator
  extend ActiveSupport::Concern

  def valid_attribute?(*attributes)
    valid?

    attrs = attributes.flatten.collect(&:to_sym)
    attrs.each do |attr|
      encrypted_attr = "encrypted_#{attr}" 
      attrs << encrypted_attr.to_sym if has_attribute? encrypted_attr
    end

    errors.each do |attribute, _error|
      errors.delete(attribute) if !attrs.include?(attribute)
    end
    errors.empty?
  end
end
