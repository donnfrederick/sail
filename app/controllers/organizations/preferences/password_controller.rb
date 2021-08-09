module Organizations
  module Preferences
    class PasswordController < BaseController
      include Concerns::Language

      validates :update do
        string :password,         strong: true, description: "パスワード"
        string :current_password, strong: true, description: "パスワード"
      end

      def show
      end

      def edit
        @error_message = nil
      end

      def update
        @error_message = nil
        current_staff.assign_new_password(params[:current_password], params[:password])

        unless current_staff.errors.empty? && current_staff.save
          @error_message = error_messages_of(current_staff)
        end

        render "edit"
      end
    end
  end
end
