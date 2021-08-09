module Webhook
    module V1
      class GoogleplayController < WebhookController
  
        def index
          #API動作確認用のアクション(GET)
          render json: { status: 'SUCCESS' }
        end
        
        def show
          #API動作確認用のアクション(POST/GET)
          render :json => "ユーザーネーム は #{params[:username]}"
          if params[:username]
            logger.debug("POST test succeeded, username is #{params[:username]}")
          end
        end
  
        def new
          #ISSUEの新規作成：Androidの課金処理の中からだけ呼び出される
  
          #jsonからdataを取得
          userid = params[:userid]
          purchaseToken = params[:purchaseToken]
  
          if params[:userid]
            #logger.debug("POST test succeeded, username is #{params[:userid]} , #{params[:purchaseToken]}")
            #同じpurchaseTokenが存在しない場合にだけ新しいISSUEを作る
            unless Issue.exists?(data_id: purchaseToken)
              @issue = GoogleplayIssue.new(
                user_id: userid,
                succeeded: true,
                conversations: -1,
                expired_at: Time.now.since(1.months),
                prerogative: true,
                data_id: purchaseToken
              )
              @issue.save!
              @issue
            end
          end
        end
  
        def update
          #ISSUEの更新：Google Cloud Pub/Subからのwebhookから呼び出される
          #更新用に使用
          # google play json見本
          # https://developer.android.com/google/play/billing/rtdn-reference
  
          #jsonからdata部分のみを取得
          data = params[:googleplay][:message][:data]
  
          #Notification部分をデコード
          decode_data = Base64.decode64(data)
  
          #デコードしたものを再度json化
          notificationData = JSON.parse(decode_data)
  
          if !notificationData["subscriptionNotification"].nil?
            # 本番通知json用
            #購入トークンを確認
            notificationType = notificationData["subscriptionNotification"]["notificationType"]
            purchaseToken = notificationData["subscriptionNotification"]["purchaseToken"]
            #notificationTypeが「（2）SUBSCRIPTION_RENEWED」の場合だけ更新
            if notificationType == 2
              #対象の購入トークンの期限日を延長
              if Issue.exists?(data_id: purchaseToken)
                issue = Issue.find_by(data_id: purchaseToken)
                issue.update(expired_at: Time.now.since(1.months))
              end
            end
          elsif !notificationData["testNotification"].nil?
            # テスト通知json用
            testVersion = notificationData["testNotification"]["version"]
            p(testVersion)
          else
            p("Googleplay webhook 通知の受け取り失敗")
          end
  
        end
      end
    end
  end
  