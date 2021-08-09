module Gateway
  class ApiConnector
    def api
      yield
    end
  end
end
