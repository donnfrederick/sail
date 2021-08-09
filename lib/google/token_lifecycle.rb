module Google
  class TokenLifecycle
    attr_reader :store_file

    TOKEN_PATH = "/tmp/google_spreadsheets_token.yaml".freeze
    CONFIG_HASH_KEYWORD = "google.apis.oauth2.spreadsheets.credentials_hash".freeze
    CONFIG_STORE_KEYWORD = "google.apis.oauth2.spreadsheets.credentials_store_yaml".freeze

    def initialize
      @store_file = "#{Rails.root}#{TOKEN_PATH}"
    end

    def update
      config = SiteConfig.find_record_by_keyword!(CONFIG_STORE_KEYWORD)
      config.update_content!(store_yaml_content)
    end

    def credentials_hash
      @credentials_hash ||= SiteConfig.find_by_keyword(CONFIG_KEYWORD)
    end

    def store_yaml_content
      File.read(store_file)
    end
  end
end
