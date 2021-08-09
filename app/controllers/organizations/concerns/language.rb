module Organizations
  module Concerns
    module Language
      extend ActiveSupport::Concern

      included do
        before_action :the_language
      end

      protected

      def the_language
        return @lang if @lang.present?

        lang = user_locale || session_locale || extract_locale_from_accept_language_header
        if lang.present?
          session[:org_lang] = lang
          I18n.locale = lang
          @lang = lang
        end
      end

      private

      def session_locale
        session[:org_lang] if session[:org_lang].present?
      end

      def user_locale
        return if params[:lang].blank?

        if I18n.available_locales.include? params[:lang].try(:to_sym)
          params[:lang]
        end
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
