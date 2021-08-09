require 'google/apis/sheets_v4'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'fileutils'

module Google
  class Spreadsheet
    attr_reader :sheet_id, :authorized

    OOB_URI = 'urn:ietf:wg:oauth:2.0:oob'.freeze
    APPLICATION_NAME = 'Google Sheets API Ruby Quickstart'.freeze
    SCOPE = Google::Apis::SheetsV4::AUTH_SPREADSHEETS

    def initialize(sheet_id)
      @sheet_id = sheet_id
      @authorized = false
    end

    def authorize
      sheets_service.client_options.application_name = APPLICATION_NAME
      sheets_service.authorization = authenticate
      @authorized = true
    end

    def append(sheet_name, rows)
      operate do |service|
        value_range_object = {
          majorDimension:"ROWS",
          values: rows
        }
        service.append_spreadsheet_value(sheet_id, sheet_name, value_range_object, value_input_option: 'USER_ENTERED')
      end
    end

    def get_csv(sheet_name, range = nil)
      operate do |service|
        response = if range.nil? || range.empty?
                     service.get_spreadsheet_values(sheet_id, "#{sheet_name}")
                   else
                     service.get_spreadsheet_values(sheet_id, "#{sheet_name}!#{range}")
                   end

        response.values.map do |row|
          puts row.join("\t")
        end
      end
    end

    def update_rows(sheet_name, start_from, rows)
      operate do |service|
        value_range = Google::Apis::SheetsV4::ValueRange.new
        range = range_by_start_rows(start_from, rows)
        range = "#{sheet_name}!#{range}"
        value_range.range = range
        value_range.major_dimension = "ROWS"
        value_range.values = rows
        service.update_spreadsheet_value(sheet_id, range, value_range, value_input_option: 'USER_ENTERED')
      end
    end

    private

      def range_by_start_rows(start, rows)
        last_column_offset = rows.map(&:count).max
        last_column_name = column_name(last_column_offset)
        "A#{start + 1}:#{last_column_name}#{rows.count + start}"
      end

      def column_name(offset)
        offset.to_s(26).tr("0-9a-p", "A-Z")
      end

      def operate
        authorize unless authorized

        yield sheets_service
      end

      def token_lifecycle
        @token_lifecycle ||= TokenLifecycle.new
      end

      def sheets_service
        @sheets_service ||= Google::Apis::SheetsV4::SheetsService.new
      end

      ##
      # Ensure valid credentials, either by restoring from the saved credentials
      # files or intitiating an OAuth2 authorization. If authorization is required,
      # the user's default browser will be launched to approve the request.
      #
      # @return [Google::Auth::UserRefreshCredentials] OAuth2 credentials
      def authenticate
        client_id = Google::Auth::ClientId.from_hash(token_lifecycle.credentials_hash)
        token_store = Google::Auth::Stores::FileTokenStore.new(file: token_lifecycle.store_file)
        authorizer = Google::Auth::UserAuthorizer.new(client_id, SCOPE, token_store)
        user_id = 'default'
        credentials = authorizer.get_credentials(user_id)
        if credentials.nil?
          url = authorizer.get_authorization_url(base_url: OOB_URI)
          puts 'Open the following URL in the browser and enter the ' \
               "resulting code after authorization:\n" + url
          code = STDIN.gets
          credentials = authorizer.get_and_store_credentials_from_code(
            user_id: user_id, code: code, base_url: OOB_URI
          )
          token_lifecycle.update
        end
        credentials
      end
  end
end
