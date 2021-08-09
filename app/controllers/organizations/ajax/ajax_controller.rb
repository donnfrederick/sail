module Organizations
  module Ajax
    # ブラウザセッションに依存したAPIとしてAjax用のAPIを定義
    class AjaxController < BaseController
      include Concerns::AuthenticatorForJson

      protected

      def serialized_json(data)
        ActiveModelSerializers::SerializableResource.new(data).as_json
      end
    end
  end
end
