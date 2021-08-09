module Paypal
  class PayerInfo < LooseObject
    attr_reader :email

    def user
      User.by_email(email).first
    end

    def to_json
      { email: email }
    end
  end
end
