class FatalError < StandardError
  def http_status
    :internal_server_error
  end
end
