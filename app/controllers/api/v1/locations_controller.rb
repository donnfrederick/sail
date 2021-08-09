module Api
  module V1
    class LocationsController < ApiController
      skip_before_action :auth_with_token!, only: [:countries, :timezones]

      DEFAULT_COUNTRY_CODE = "US"

      validates :timezones do
        string :country, description: "国コード (ISO 3166-1 alpha-2 の2文字コード)"
      end

      def countries
        data = ISO3166::Country.all_names_with_codes.map do |values|
          values << ISO3166::Country[values[1]].try(:country_code) || "0"
          values
        end

        content = {
          data: data,
          meta: {
            default_country:  default_country,
            default_timezone: default_timezone,
          }
        }
        render json: content
      end

      def timezones
        country = ISO3166::Country.new(params[:country])

        timezones = if country
                      country.timezones.zone_identifiers
                    else
                      TZInfo::Timezone.all_identifiers
                    end

        content = {
          data: timezones,
          meta: {
            default_country:  default_country,
            default_timezone: default_timezone,
          }
        }
        render json: content
      end

      private

        def default_country
          @default_country ||= request.headers["CloudFront-Viewer-Country"].presence || DEFAULT_COUNTRY_CODE
        end

        def default_timezone
          return @default_timezone if @default_timezone.present?

          country = ISO3166::Country.new(default_country)

          timezones = if country
                        country.timezones.zone_identifiers
                      else
                        TZInfo::Timezone.all_identifiers
                      end

          @default_timezone ||= timezones.first
        end
    end
  end
end
