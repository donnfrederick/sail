module Paypal
  # @see https://developer.paypal.com/docs/api/catalog-products/v1/
  class Product < LooseObject
    attr_reader :id, :name, :description, :type, :category, :image_url, :home_url,
                :create_time, :update_time, :links

    CATEGORIES = [
      CATEGORY_ACADEMIC_SOFTWARE = "ACADEMIC_SOFTWARE".freeze,
      CATEGORY_TELECOMMUNICATION_SERVICES = "TELECOMMUNICATION_SERVICES".freeze,
    ]

    TYPES = [
      TYPE_PHYSICAL = "PHYSICAL".freeze,
      TYPE_DIGITAL = "DIGITAL".freeze,
      TYPE_SERVICE = "SERVICE".freeze,
    ]

    def self.all
      pagination = Client.new.api_get("/v1/catalogs/products", {})
      pagination.fetch(:products, []).map do |data|
        new(data)
      end
    end

    def self.create!(attrs)
      default_values = {
        type: TYPE_SERVICE,
      }
      data = Client.new.api_post(
        "/v1/catalogs/products",
        default_values.deep_merge(attrs)
      )

      new(data)
    end

    def self.retrieve!(id)
      data = Client.new.api_get("/v1/catalogs/products/#{id}", {})
      new(data)
    end

    def update!(attrs)
      data = attrs.map do |key, value|
        {
          op: value.nil? ? "remove" : "replace",
          path: "/#{key}",
          value: value
        }
      end
      Client.new.api_patch("/v1/catalogs/products/#{id}", data)
      apply(attrs)
    end

    def destroy!
      # NOTE: PayPal APIではDELETEメソッドはないようです。なんてこった！
      Rails.logger.info "[UNIMPLEMENTED] Paypal::Product.destroy! is not implemented due to the official API, however it was called now."
    end

    private

      def parse_links(list_of_attrs)
        list_of_attrs.map do |link|
          Link.new link
        end
      end
  end
end
