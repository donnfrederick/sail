module Paypal
  class Link < LooseObject
    attr_reader :href, :rel, :method

    def to_json
      {
        href: href,
        rel: rel,
        method: method.to_s,
      }
    end

    private

      def parse_method(name)
        name.downcase.to_sym
      end
  end
end
