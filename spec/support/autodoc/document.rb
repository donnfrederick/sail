# Autodoc の出力形式をカスタマイズ
# https://github.com/r7kamura/autodoc/blob/master/lib/autodoc/document.rb

module Autodoc
  class Document
    class Parameter
      def to_s
        string = ""
        string << "#{body} | #{payload}"

        if validator.respond_to? :validators
          validator.validators.each do |x|
            string << "\n"
            string << Parameter.new(x).to_s
          end
        end

        string
      end

      private

        def body
          if validator.key.nil?
            validator.type
          else
            [validator.key, validator.type].join(" | ")
          end
        end

        def payload
          results = []
          results << required
          results << assets.join(" <br> ")
          results << validator.options[:description].to_s.gsub("\n", "<br>")

          results.join(" | ")
        end

        def assets
          @assets ||= [format, only, except].compact
        end

        def required
          validator.required? ? "**required**" : "optional"
        end

        def format
          return nil if validator.options[:format].blank?

          if validator.options[:format].is_a? Array
            "Format<br>#{validator.options[:format].map(&:inspect).join("<br>")}"
          else
            "Format<br>#{validator.options[:format].inspect}"
          end
        end

        def only
          return nil if validator.options[:only].blank?

          "Only<br>#{validator.options[:only].inspect}"
        end

        def except
          return nil if validator.options[:except].blank?

          "Except<br>#{validator.options[:except].inspect}"
        end
    end
  end
end
