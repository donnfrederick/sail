module Api
  module V1
    class PhoneAuthenticationsController < ApiController
      skip_before_action :auth_with_token!

      rescue_from UserError,  with: :user_error

      validates :create do
        string :phone_number, description: "電話番号を国際番号なしで指定します。ハイフンや記号は含まないようにしてください。"
        string :country, description: "国コードを2桁アルファベットで指定します。例：日本 JP"
      end

      validates :update do
        string :phone_number, description: "電話番号を国際番号なしで指定します。ハイフンや記号は含まないようにしてください。"
        string :country, description: "国コードを2桁アルファベットで指定します。例：日本 JP"
        string :code, description: "SMSメッセージで受信した認証コードを指定してください。"
      end

      def create
        if User.by_phone_number(params[:phone_number]).exists?
          raise UserError.new(I18n.t("errors.sms_authentication.already_exists", locale: locale))
        end

        phone_authentication = PhoneAuthentication.create!(
          phone_number: params[:phone_number],
          country: params[:country],
          )

        sms = SmsAuthentication.new(phone_authentication)
        sms.send_code
        render json: phone_authentication
      end

      def update
        phone_authentication = PhoneAuthentication.
          by_phone_number(params[:phone_number]).
          by_country(params[:country]).
          find_by(code: params[:code])

        if phone_authentication.present?
          phone_authentication.activate!
          render json: phone_authentication
        else
          raise UserError.new(I18n.t("errors.sms_authentication.bad_code", locale: locale))
        end
      end

      private

        def user_error(e)
          render_error([ e.message ], :unprocessable_entity)
        end
    end
  end
end
