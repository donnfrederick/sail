module Api
  module V1
    module Concerns
      module ErrorHandler
        extend ActiveSupport::Concern

        included do
          rescue_from ActiveRecord::RecordNotFound, with: :not_found
          rescue_from ActiveRecord::RecordInvalid,  with: :invalid_values

          # rescue_from WeakParameters::ValidationError do
          #   head 400
          # end
        end

        def render_error(message, status)
          status_code = Rack::Utils::SYMBOL_TO_STATUS_CODE[status]
          lang = Context.instance.current_user.try(:language)
          render json: { error: { status: status_code, message: message }, lang: lang },
                 status: status
        end

        def not_found
          render_error(I18n.t("errors.messages.not_found"), :not_found)
        end

        def invalid_values(e)
          Rails.logger.error e.message
          render_error(e.message, :unprocessable_entity)
        end
      end
    end
  end
end
