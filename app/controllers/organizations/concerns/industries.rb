module Organizations
  module Concerns
    module Industries
      extend ActiveSupport::Concern

      included do
        before_action :role_type
      end

      def link_to_section(section)
        path = if @role_type == self.controller_name && self.action_name == "index"
                 "/" + ["organizations", self.controller_name].join("/")
               else
                 "/" + ["organizations", @role_type, self.controller_name, self.action_name].join("/")
               end
        view_context.org_switch_path(@role_type, section.id, path)
      end

      def max_user_in_table
        Settings.organizations.max_user_in_table_page
      end
    end
  end
end
