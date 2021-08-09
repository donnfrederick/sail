module Organizations
  module Concerns
    module RandomEmail
      extend ActiveSupport::Concern

      protected

      # ランダムなメールアドレスを生成する
      def random_email
        email = nil
        loop do
          email = SecureRandom.urlsafe_base64 + "@rand.helte.jp"
          is_new = User.by_email(email).blank?
          break if is_new
        end
        email
      end
    end
  end
end
