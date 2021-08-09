class AddDescriptionToSiteConfigs < ActiveRecord::Migration[5.2]
  def change
    # nothing to do
  end

  def data
    SiteConfig.reset_column_information

    keyword_descriptions = [
        {
            keyword: "payment.stripe.api_secret_key",
            description: "Stripe APIのSecret Keyを指定します。テスト環境用と本番用で異なります。テスト環境では、クレジットカード番号を 4242-4242-4242-4242とし、CVSを424、Post codeを242424 にできます。"
        },
        {
            keyword: "payment.stripe.api_public_key",
            description: "Stripe APIのPublic Keyを指定します。テスト環境用と本番用で異なります。テスト環境では、クレジットカード番号を 4242-4242-4242-4242とし、CVSを424、Post codeを242424 にできます。"
        },
        {
            keyword: "admin.report.email.from",
            description: ""
        },
        {
            keyword: "admin.report.timezone",
            description: ""
        },
        {
            keyword: "admin.report.email.to",
            description: ""
        },
        {
            keyword: "payment.paypal.api_client_id",
            description: "PayPal APIのClient IDを指定します。テスト環境用と本番用で異なります。テスト環境では、https://developer.paypal.com/developer/accounts/ に記述のあるアカウントを使用できます。"
        },
        {
            keyword: "payment.paypal.api_secret_key",
            description: "PayPal APIのClient IDを指定します。テスト環境用と本番用で異なります。テスト環境では、https://developer.paypal.com/developer/accounts/ に記述のあるアカウントを使用できます。"
        },
        {
            keyword: "payment.paypal.api_url",
            description: "PayPal APIのURLを指定します。"
        },
        {
            keyword: "sms_authentication.twilio.account_sid",
            description: "Twilio SMS APIのAccount SIDを指定します。"
        },
        {
            keyword: "sms_authentication.twilio.auth_token",
            description: "Twilio SMS APIのAuthトークンを指定します。"
        },
        {
            keyword: "sms_authentication.twilio.sms_phone_number",
            description: "Twilio SMS APIで使用するTwilioで生成したSMS送信用の電話番号を先頭記号\"+\"と国際番号を含めて指定します。"
        },
        {
            keyword: "user.teacher.privilege_condition.tutor",
            description: "日本人ユーザーのうち有償ボランティアやシニアテスター、運営メンバーユーザーの優遇対象となる失敗会話数を指定します。学生ユーザーが原因で会話が失敗した数が連続して何回あったかの数字です。"
        },
        {
            keyword: "user.teacher.privilege_condition.regular",
            description: "日本人ユーザーの優遇対象となる失敗会話数を指定します。学生ユーザーが原因で会話が失敗した数が連続して何回あったかの数字です。"
        },
        {
            keyword: "user.student.privilege_condition.tutor",
            description: "学生ユーザーのうち信頼できるユーザーや運営メンバーユーザーの優遇対象となる失敗会話数を指定します。日本人ユーザーが原因で会話が失敗した数が連続して何回あったかの数字です。"
        },
        {
            keyword: "user.student.privilege_condition.regular",
            description: "学生ユーザーの優遇対象となる失敗会話数を指定します。日本人ユーザーが原因で会話が失敗した数が連続して何回あったかの数字です。"
        },
        {
            keyword: "user.teacher.unprivilege_condition.tutor",
            description: "優遇措置を受けている日本人ユーザーのうち有償ボランティアやシニアテスター、運営メンバーユーザーについて、その優遇を解除する会話成功数を指定します。"
        },
        {
            keyword: "user.teacher.unprivilege_condition.regular",
            description: "優遇措置を受けている日本人ユーザーについて、その優遇を解除する会話成功数を指定します。"
        },
        {
            keyword: "user.student.unprivilege_condition.tutor",
            description: "優遇措置を受けている学生ユーザーのうち信頼できるユーザーや運営メンバーユーザーについて、その優遇を解除する会話成功数を指定します。"
        },
        {
            keyword: "user.student.unprivilege_condition.regular",
            description: "優遇措置を受けている学生ユーザーについて、その優遇を解除する会話成功数を指定します。"
        },
        {
            keyword: "user.student.suspicious_condition.tutor",
            description: "学生ユーザーのうち信頼できるユーザーや運営メンバーユーザーについて、自分が原因で失敗した会話数の上限を指定して、それ以上の場合にフォローアップのためのマッチング制約を行うようにします。"
        },
        {
            keyword: "user.student.suspicious_condition.regular",
            description: "学生ユーザーについて、自分が原因で失敗した会話数の上限を指定して、それ以上の場合にフォローアップのためのマッチング制約を行うようにします。"
        },
        {
            keyword: "user.teacher.suspicious_condition.tutor",
            description: "日本人ユーザーのうち有償ボランティアやシニアテスター、運営メンバーユーザーについて、自分が原因で失敗した会話数の上限を指定して、それ以上の場合にフォローアップのためのマッチング制約を行うようにします。"
        },
        {
            keyword: "user.teacher.suspicious_condition.regular",
            description: "日本人ユーザーについて、自分が原因で失敗した会話数の上限を指定して、それ以上の場合にフォローアップのためのマッチング制約を行うようにします。"
        },
        {
            keyword: "i18n.ja.analytics.sections_conversations",
            description: "分析項目について、施設、大学、送り出し機関単位の会話数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.sections_conversations",
            description: "分析項目について、施設、大学、送り出し機関単位の会話数の項目名を指定します。"
        },
        {
            keyword: "i18n.ja.analytics.student_registrants",
            description: "分析項目について、学生の新規登録数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.student_registrants",
            description: "分析項目について、学生の新規登録数の項目名を指定します。"
        },
        {
            keyword: "i18n.ja.analytics.teacher_registrants",
            description: "分析項目について、日本人の新規登録数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.teacher_registrants",
            description: "分析項目について、日本人の新規登録数の項目名を指定します。"
        },
        {
            keyword: "i18n.ja.analytics.conversation_schedules",
            description: "分析項目について、会話の予約日時ごとの数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.conversation_schedules",
            description: "分析項目について、会話の予約日時ごとの数の項目名を指定します。"
        },
        {
            keyword: "i18n.ja.analytics.conversation_creations",
            description: "分析項目について、会話の予約の作成日時ごとの数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.conversation_creations",
            description: "分析項目について、会話の予約の作成日時ごとの数の項目名を指定します。"
        },
        {
            keyword: "i18n.ja.analytics.successful_conversations",
            description: "分析項目について、会話の成功数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.successful_conversations",
            description: "分析項目について、会話の成功数の項目名を指定します。"
        },
        {
            keyword: "i18n.ja.analytics.failure_conversations",
            description: "分析項目について、会話の失敗数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.failure_conversations",
            description: "分析項目について、会話の失敗数の項目名を指定します。"
        },
        {
            keyword: "i18n.ja.analytics.unmatched_conversations",
            description: "分析項目について、会話の未マッチ数の項目名を指定します。"
        },
        {
            keyword: "i18n.en.analytics.unmatched_conversations",
            description: "分析項目について、会話の未マッチ数の項目名を指定します。"
        },
        {
            keyword: "user.student.payment.trial.duration",
            description: "新規学生ユーザーの課金までの無償(トライアル)期間を指定します。この値は\"user.student.payment.trial.term\"の値を単位とした数値です。\"user.student.payment.trial.term\"が\"week\"の場合、\"user.student.payment.trial.duration\"の値に2を入力したとき、2週間を意味します。"
        },
        {
            keyword: "user.student.payment.trial.term",
            description: "新規学生ユーザーの課金までの無償(トライアル)期間の単位を指定します。単位は\"week\"、\"month\"、\"year\" (小文字) のいずれかです。この値は\"user.student.payment.trial.duration\"の値についての単位です。\"user.student.payment.trial.term\"に\"week\"を入力し、\"user.student.payment.trial.duration\"の値が2の場合は、2週間を意味します。"
        }
    ]

    keyword_descriptions.each do |data|
      config = SiteConfig.find_record_by_keyword(data[:keyword])
      if config.present?
        config.update(description: data[:description])
      end
    end
  end
end
