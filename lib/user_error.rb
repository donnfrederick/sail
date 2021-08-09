class UserError < StandardError
  def http_status
    :bad_request
  end
end
