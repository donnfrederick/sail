module Paypal
  class Detail < LooseObject
    attr_reader :field, :value, :location, :issue, :description
  end
end
