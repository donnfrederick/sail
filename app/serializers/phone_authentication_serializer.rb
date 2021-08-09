class PhoneAuthenticationSerializer < ActiveModel::Serializer
  attributes :phone_number, :country, :activated
end
