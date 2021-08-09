module Organizations
  module Preferences
    class EmailController < BaseController
      include Concerns::Language

      validates :update do
        string :email, strong: true, description: "メールアドレス"
      end

      def show
      end

      def edit
        @error_message = nil
      end

      def update
        @error_message = nil
        current_staff.email = params[:email]

        if current_staff.errors.empty? && current_staff.save
          return redirect_to view_context.org_preference_email_path
        else
          @error_message = error_messages_of(current_staff)
        end

        render "edit"
      end
    end
  end
end
