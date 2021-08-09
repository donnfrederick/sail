class PushNotification
  PROJECT_ID = ENV["GOOGLE_PROJECT_ID"]
  FCM_SCOPE  = "https://www.googleapis.com/auth/firebase.messaging"
  ENDPOINT   = "https://fcm.googleapis.com/v1/projects/#{PROJECT_ID}/messages:send"

  def initialize
    @access_token = access_token
  end

  def notice(*args)
    payload  = payload_notice(*args)
    response = push(payload)
  end

  def reservation(*args)
    payload  = payload_reservation(*args)
    response = push(payload)
  end

  def call(*args)
    payload  = payload_call(*args)
    response = push(payload)
  end

  def payload_notice(*args)
    options = args.first

    {
      "message": {
        "data": {
          "type": "notice",
          "url": options[:url]
        },
        "android": {
          "priority": "NORMAL",
          "data": {
            "title": options[:title],
            "body": options[:message]
          }
        },
        "apns": {
          "headers": {
            "apns-priority": "5"
          },
          "payload": {
            "aps": {
              "alert": {
                "title": options[:title],
                "body": options[:message]
              }
            }
          }
        },
        "token": options[:token]
      }
    }
  end

  def payload_reservation(*args)
    options = args.first

    {
      "message": {
        "data": {
          "type": "reservation",
          "url": options[:url]
        },
        "android": {
          "priority": "NORMAL",
          "ttl": "#{24*60*60}s",
          "data": {
            "title": options[:title],
            "body": options[:message]
          }
        },
        "apns": {
          "headers": {
            "apns-priority": "5",
            "apns-expiration": "#{1.day.since.to_i}"
          },
          "payload": {
            "aps": {
              "alert": {
                "title": options[:title],
                "body": options[:message]
              },
              "sound": "default"
            }
          }
        },
        "token": options[:token]
      }
    }
  end

  def payload_call(*args)
    options = args.first

    {
      "message": {
        "data": {
          "type": "call",
          "url": options[:url]
        },
        "android": {
          "priority": "HIGH",
          "ttl": "#{24*60*60}s",
          "data": {
            "title": options[:title],
            "body": options[:message]
          }
        },
        "apns": {
          "headers": {
            "apns-priority": "10",
            "apns-expiration": "#{1.day.since.to_i}"
          },
          "payload": {
            "aps": {
              "alert": {
                "title": options[:title],
                "body": options[:message]
              },
              "sound": "default"
            }
          }
        },
        "token": options[:token]
      }
    }
  end

  def access_token
    return nil if PROJECT_ID.nil? || Rails.env.test?

    return @access_token if @access_token.present?

    begin
      authorizer = ::Google::Auth::ServiceAccountCredentials.make_creds(
          scope:       FCM_SCOPE
      )
      @access_token = authorizer.fetch_access_token!
    rescue => e
      Rails.logger.error e.message
      Rails.logger.error e.backtrace.join("\n")
    end
  end

  def push(payload)
    return nil if access_token.nil?
    return nil if payload.try(:[], :message).try(:[], :token).blank?

    conn = Faraday.new(url: ENDPOINT)
    response = conn.post do |req|
      req.headers["Content-Type"] = "application/json"
      req.headers["Authorization"] = "Bearer " + access_token["access_token"].to_s
      req.body = payload.to_json
    end

    Rails.logger.info payload.inspect
    Rails.logger.info response.body

    response
  end
end
