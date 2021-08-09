class ApplyFollowUpSettingsToSiteConfigs < ActiveRecord::Migration[5.2]
  def change
    # nothing to change
  end

  def data
    SiteConfig.reset_column_information

    configs = [
        {
            keyword: "user.teacher.remove_follow_up.tutor",
            content: "1",
            description: "日本人ユーザーのうち有償ボランティアやシニアテスター、運営メンバーのフォローアップを解除する会話成功数を指定します。"
        },
        {
            keyword: "user.teacher.remove_follow_up.regular",
            content: "1",
            description: "日本人ユーザーのフォローアップを解除する会話成功数を指定します。"
        },
        {
            keyword: "user.student.remove_follow_up.tutor",
            content: "1",
            description: "学生ユーザーのうち信頼できるユーザーや運営メンバーのフォローアップを解除する会話成功数を指定します。"
        },
        {
            keyword: "user.student.remove_follow_up.regular",
            content: "1",
            description: "学生ユーザーのフォローアップを解除する会話成功数を指定します。"
        }
    ]
    configs.each do |attrs|
      SiteConfig.create!(attrs.merge(admin_user_id: AdminUser.first.id))
    end
  end
end
