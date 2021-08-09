module Api
  module V1
    module Concerns
      module Internationalizator
        extend ActiveSupport::Concern

        included do
          before_action :set_locale
        end

        def set_locale
          I18n.locale = current_user.try(:default_locale) ||
                        extract_locale_from_lang_param ||
                        extract_locale_from_referrer ||
                        extract_locale_from_accept_language_header ||
                        I18n.default_locale
        end

        private

          def extract_locale_from_lang_param
            if I18n.available_locales.include? params[:locale].try(:to_sym)
              params[:locale]
            end
          end

          def extract_locale_from_referrer
            request.referrer.to_s.match(/teachers/) ? :ja : :en
          end

          def extract_locale_from_accept_language_header
            req_lang = request.env["HTTP_ACCEPT_LANGUAGE"]
            if req_lang
              language = req_lang.scan(/^[a-z]{2}/).first
              language if I18n.available_locales.include?(language.to_sym)
            end
          end
      end
    end
  end
end
