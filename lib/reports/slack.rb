module Reports
  class Slack
    attr_reader :request, :exception

    def initialize(request, exception: nil)
      @request = request
      @exception = exception
    end

    def report
      Slack500.post(request, exception) unless ignorable?
    end

    private

      def ignorable?
        command_access? || ip_direct_access? || security_leak_scan?
      end

      def ip_direct_access?
        request.host.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/).present?
      end

      def command_access?
        request.user_agent.empty?
      end

      def security_leak_scan?
        request.path.match(/(\.txt|\.xml|\.jsp|\.asp|\.php|\.do|\.md|\.rb|\.action|\.git|\.hg|\.svn|\.ssh|ccvv|currentsetting|manager|phpMyAdmin|cgi|wp)/).present?
      end
  end
end
