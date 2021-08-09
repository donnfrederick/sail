module Paypal
  class LooseObject
    def initialize(attrs)
      apply(attrs)
    end

    def apply(attrs)
      attrs.each do |key, value|
        parser = "parse_#{key}"
        value = send(parser, value) if respond_to?(parser.to_sym, true)
        instance_variable_set("@#{key}".to_sym, value)
      end
    end
  end
end
