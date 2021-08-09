module Organizations
  class ErrorsController < ApplicationController
    include Concerns::Language
    layout "errors"

    def no_contract(type = "unspecified")
      type = params[:type] if params[:type].present?
      render "no_contract_" + type
    end
  end
end
