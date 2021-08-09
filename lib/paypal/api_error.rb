module Paypal
  # @see https://developer.paypal.com/docs/api/reference/api-responses/#http-status-codes
  class ApiError < StandardError
    attr_reader :debug_id, :information_link, :details, :links

    def self.build(attrs)
      name = attrs.fetch(:name, "UNKNOWN_ERROR")
      error_class = name.downcase.camelize
      error_class = "UnknownError" unless class_exists? error_class
      eval("Paypal::#{error_class}.new(attrs)")
    end

    def self.class_exists?(class_name)
      klass = Paypal.const_get(class_name)
      return klass.is_a?(Class)
    rescue NameError
      return false
    end

    def initialize(attrs)
      attrs.each do |key, value|
        parser = "parse_#{key}"
        value = send(parser, value) if respond_to?(parser.to_sym, true)
        instance_variable_set("@#{key}".to_sym, value)
      end

      message = attrs.fetch(:message, "(no message)")
      if details.present?
        message += "\n" + details.map(&:to_json).join("\n")
      end

      super(message)
    end

    private

      def parse_details(list_of_attrs)
        list_of_attrs.map do |detail|
          Detail.new detail
        end
      end

      def parse_links(list_of_attrs)
        list_of_attrs.map do |link|
          Link.new link
        end
      end
  end
end
